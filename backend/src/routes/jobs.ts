import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';
import { jobs, Job, NewJob } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const allJobs = await db
      .select()
      .from(jobs)
      .where(eq(jobs.status, 'open'))
      .orderBy(jobs.createdAt);
    
    res.json(allJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const job = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, id))
      .limit(1);

    if (job.length === 0) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    res.json(job[0]);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

export default router;
