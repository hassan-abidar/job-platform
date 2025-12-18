import { pgTable, uuid, varchar, text, timestamp, pgEnum, boolean } from 'drizzle-orm/pg-core';

export const jobTypeEnum = pgEnum('job_type', ['full-time', 'part-time', 'contract', 'internship', 'remote']);
export const jobStatusEnum = pgEnum('job_status', ['open', 'closed', 'draft']);
export const applicationStatusEnum = pgEnum('application_status', ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired']);

export const jobs = pgTable('jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  department: varchar('department', { length: 100 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  type: jobTypeEnum('type').notNull().default('full-time'),
  description: text('description').notNull(),
  requirements: text('requirements'),
  benefits: text('benefits'),
  salary: varchar('salary', { length: 100 }),
  status: jobStatusEnum('status').notNull().default('open'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const applications = pgTable('applications', {
  id: uuid('id').defaultRandom().primaryKey(),
  jobId: uuid('job_id').references(() => jobs.id, { onDelete: 'set null' }),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  resumeUrl: varchar('resume_url', { length: 500 }).notNull(),
  resumeOriginalName: varchar('resume_original_name', { length: 255 }),
  coverLetter: text('cover_letter'),
  linkedinUrl: varchar('linkedin_url', { length: 500 }),
  portfolioUrl: varchar('portfolio_url', { length: 500 }),
  isSpontaneous: boolean('is_spontaneous').default(false).notNull(),
  status: applicationStatusEnum('status').notNull().default('pending'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
