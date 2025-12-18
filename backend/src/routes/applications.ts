import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';
import { applications, jobs, NewApplication } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const uploadsDir = path.join(process.cwd(), 'uploads', 'resumes');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = Router();

router.post('/', upload.single('resume'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Resume file is required' });
      return;
    }

    const {
      jobId,
      firstName,
      lastName,
      email,
      phone,
      coverLetter,
      linkedinUrl,
      portfolioUrl,
    } = req.body;

    const isSpontaneous = !jobId || jobId === 'spontaneous';

    if (!isSpontaneous) {
      const job = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
      if (job.length === 0) {
        fs.unlinkSync(req.file.path);
        res.status(404).json({ error: 'Job not found' });
        return;
      }
    }

    const newApplication: NewApplication = {
      jobId: isSpontaneous ? null : jobId,
      firstName,
      lastName,
      email,
      phone: phone || null,
      resumeUrl: `/uploads/resumes/${req.file.filename}`,
      resumeOriginalName: req.file.originalname,
      coverLetter: coverLetter || null,
      linkedinUrl: linkedinUrl || null,
      portfolioUrl: portfolioUrl || null,
      isSpontaneous,
      status: 'pending',
    };

    const result = await db.insert(applications).values(newApplication).returning();
    
    res.status(201).json({ 
      message: 'Application submitted successfully',
      application: result[0]
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

export default router;
