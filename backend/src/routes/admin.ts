import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';
import { jobs, applications, NewJob, Job } from '../db/schema.js';
import { eq, desc, isNull, isNotNull } from 'drizzle-orm';

const router = Router();

const ADMIN_TOKEN = 'admin-secret-token';

const adminAuth = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
};

router.get('/jobs', adminAuth, async (req: Request, res: Response) => {
  try {
    const allJobs = await db.select().from(jobs).orderBy(desc(jobs.createdAt));
    res.json(allJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

router.post('/jobs', adminAuth, async (req: Request, res: Response) => {
  try {
    const jobData: NewJob = req.body;
    const result = await db.insert(jobs).values(jobData).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

router.put('/jobs/:id', adminAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jobData = req.body;
    
    const result = await db
      .update(jobs)
      .set({ ...jobData, updatedAt: new Date() })
      .where(eq(jobs.id, id))
      .returning();

    if (result.length === 0) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
});

router.delete('/jobs/:id', adminAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.delete(jobs).where(eq(jobs.id, id)).returning();

    if (result.length === 0) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

router.get('/applications', adminAuth, async (req: Request, res: Response) => {
  try {
    const { type, status } = req.query;

    let query = db
      .select({
        application: applications,
        job: jobs,
      })
      .from(applications)
      .leftJoin(jobs, eq(applications.jobId, jobs.id))
      .orderBy(desc(applications.createdAt));

    const results = await query;

    let filtered = results;
    if (type === 'spontaneous') {
      filtered = results.filter(r => r.application.isSpontaneous);
    } else if (type === 'job') {
      filtered = results.filter(r => !r.application.isSpontaneous);
    }

    if (status && typeof status === 'string') {
      filtered = filtered.filter(r => r.application.status === status);
    }

    res.json(filtered);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

router.get('/applications/:id', adminAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await db
      .select({
        application: applications,
        job: jobs,
      })
      .from(applications)
      .leftJoin(jobs, eq(applications.jobId, jobs.id))
      .where(eq(applications.id, id))
      .limit(1);

    if (result.length === 0) {
      res.status(404).json({ error: 'Application not found' });
      return;
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
});

router.patch('/applications/:id', adminAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const updateData: Partial<typeof applications.$inferInsert> = { updatedAt: new Date() };
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const result = await db
      .update(applications)
      .set(updateData)
      .where(eq(applications.id, id))
      .returning();

    if (result.length === 0) {
      res.status(404).json({ error: 'Application not found' });
      return;
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ error: 'Failed to update application' });
  }
});

router.delete('/applications/:id', adminAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.delete(applications).where(eq(applications.id, id)).returning();

    if (result.length === 0) {
      res.status(404).json({ error: 'Application not found' });
      return;
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

router.get('/stats', adminAuth, async (req: Request, res: Response) => {
  try {
    const allJobs = await db.select().from(jobs);
    const allApplications = await db.select().from(applications);

    const stats = {
      totalJobs: allJobs.length,
      openJobs: allJobs.filter(j => j.status === 'open').length,
      closedJobs: allJobs.filter(j => j.status === 'closed').length,
      draftJobs: allJobs.filter(j => j.status === 'draft').length,
      totalApplications: allApplications.length,
      pendingApplications: allApplications.filter(a => a.status === 'pending').length,
      spontaneousApplications: allApplications.filter(a => a.isSpontaneous).length,
      applicationsByStatus: {
        pending: allApplications.filter(a => a.status === 'pending').length,
        reviewed: allApplications.filter(a => a.status === 'reviewed').length,
        shortlisted: allApplications.filter(a => a.status === 'shortlisted').length,
        rejected: allApplications.filter(a => a.status === 'rejected').length,
        hired: allApplications.filter(a => a.status === 'hired').length,
      },
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
