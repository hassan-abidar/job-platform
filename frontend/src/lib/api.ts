export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';
  description: string;
  requirements: string | null;
  benefits: string | null;
  salary: string | null;
  status: 'open' | 'closed' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  jobId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  resumeUrl: string;
  resumeOriginalName: string | null;
  coverLetter: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  isSpontaneous: boolean;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationWithJob {
  application: Application;
  job: Job | null;
}

export interface AdminStats {
  totalJobs: number;
  openJobs: number;
  closedJobs: number;
  draftJobs: number;
  totalApplications: number;
  pendingApplications: number;
  spontaneousApplications: number;
  applicationsByStatus: {
    pending: number;
    reviewed: number;
    shortlisted: number;
    rejected: number;
    hired: number;
  };
}

export const MOCK_JOBS: Job[] = [
  {
    id: 'mock-1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Casablanca (Hybrid)',
    type: 'full-time',
    description: `We are looking for a Senior Frontend Developer to join our engineering team. You will be responsible for building and maintaining user-facing features for our web applications.

You'll work closely with our design team to implement pixel-perfect interfaces and collaborate with backend engineers to integrate APIs. This is an exciting opportunity to work on cutting-edge technology that impacts millions of users.`,
    requirements: `- 5+ years of experience with React and TypeScript
- Strong understanding of modern CSS (Tailwind, CSS-in-JS)
- Experience with state management (Redux, Zustand, or similar)
- Familiarity with testing frameworks (Jest, React Testing Library)
- Experience with CI/CD pipelines
- Excellent communication skills`,
    benefits: `- Competitive salary (18,000 - 25,000 MAD/month)
- Health insurance
- Annual bonus
- Paid time off
- Remote work flexibility
- Professional development budget`,
    salary: '18,000 - 25,000 MAD/month',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mock-2',
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Rabat (Remote)',
    type: 'full-time',
    description: `Join our backend team to build scalable APIs and services that power our platform. You'll work with modern technologies like Node.js, PostgreSQL, and cloud infrastructure.

We're building the next generation of our platform and need engineers who are passionate about clean code, performance, and reliability.`,
    requirements: `- 3+ years of experience with Node.js/TypeScript
- Strong SQL skills (PostgreSQL preferred)
- Experience with RESTful API design
- Familiarity with cloud services (AWS/GCP)
- Understanding of microservices architecture
- Experience with Docker and Kubernetes is a plus`,
    benefits: `- Competitive salary (15,000 - 22,000 MAD/month)
- Equity package
- Full remote work
- Health benefits
- Home office stipend
- Annual team retreats`,
    salary: '15,000 - 22,000 MAD/month',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mock-3',
    title: 'Product Designer',
    department: 'Design',
    location: 'Marrakech (On-site)',
    type: 'full-time',
    description: `We're looking for a creative Product Designer to help shape the future of our product. You'll be responsible for the entire design process from research to final handoff.

This role involves working closely with product managers and engineers to create intuitive and beautiful user experiences.`,
    requirements: `- 4+ years of product design experience
- Strong portfolio showcasing web/mobile design
- Proficiency in Figma
- Experience with design systems
- Understanding of accessibility standards
- User research experience`,
    benefits: `- Competitive salary
- Creative work environment
- Latest design tools and equipment
- Health and wellness benefits
- Flexible hours`,
    salary: '14,000 - 20,000 MAD/month',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mock-4',
    title: 'DevOps Engineer',
    department: 'Operations',
    location: 'Tangier (Hybrid)',
    type: 'full-time',
    description: `Join our DevOps team to help build and maintain our cloud infrastructure. You'll work on CI/CD pipelines, monitoring systems, and infrastructure automation.

We're scaling rapidly and need someone who can help us maintain reliability while moving fast.`,
    requirements: `- 3+ years of DevOps/SRE experience
- Strong experience with AWS or GCP
- Proficiency with Terraform or similar IaC tools
- Experience with Kubernetes
- Strong scripting skills (Python, Bash)
- On-call experience`,
    benefits: `- Competitive salary (16,000 - 24,000 MAD/month)
- Stock options
- Flexible work schedule
- Professional certifications paid
- Health benefits`,
    salary: '16,000 - 24,000 MAD/month',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mock-5',
    title: 'Marketing Intern',
    department: 'Marketing',
    location: 'Casablanca (On-site)',
    type: 'internship',
    description: `Great opportunity for students or recent graduates to gain hands-on marketing experience. You'll assist with social media, content creation, and campaign analytics.

This is a paid internship with the possibility of conversion to full-time.`,
    requirements: `- Currently pursuing or recently completed degree in Marketing
- Strong written communication skills
- Familiarity with social media platforms
- Basic understanding of analytics tools
- Creative mindset
- Self-starter attitude`,
    benefits: `- Paid internship (3,500 MAD/month)
- Mentorship program
- Networking opportunities
- Potential for full-time conversion
- Free lunch`,
    salary: '3,500 MAD/month',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mock-6',
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Fes (Remote)',
    type: 'full-time',
    description: `We're looking for a Customer Success Manager to help our enterprise clients get the most out of our platform. You'll be the primary point of contact for key accounts.

This role combines relationship management with technical understanding to drive customer satisfaction and retention.`,
    requirements: `- 3+ years in customer success or account management
- Experience with SaaS products
- Strong communication and presentation skills
- Ability to understand technical concepts
- CRM experience (Salesforce preferred)
- Problem-solving mindset`,
    benefits: `- Base salary + commission
- Full remote work
- Health benefits
- Professional development
- Quarterly bonuses`,
    salary: '12,000 - 16,000 MAD/month + commission',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mock-7',
    title: 'Data Analyst',
    department: 'Analytics',
    location: 'Agadir (Hybrid)',
    type: 'contract',
    description: `6-month contract position for a Data Analyst to help us make sense of our growing data. You'll work with various teams to provide insights and build dashboards.

Great opportunity to work on interesting data problems with potential for extension.`,
    requirements: `- 2+ years of data analysis experience
- Strong SQL skills
- Experience with BI tools (Tableau, Looker)
- Python/R for data analysis
- Statistical analysis background
- Clear communication of findings`,
    benefits: `- Competitive hourly rate
- Flexible schedule
- Remote work options
- Extension possibility
- Modern tech stack`,
    salary: '150 - 200 MAD/hour',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mock-8',
    title: 'HR Coordinator',
    department: 'Human Resources',
    location: 'Oujda (On-site)',
    type: 'part-time',
    description: `Part-time HR Coordinator to support our growing team. You'll handle recruitment coordination, onboarding, and general HR administration.

Perfect for someone looking for work-life balance with meaningful HR experience.`,
    requirements: `- 1+ years of HR experience
- Knowledge of HR best practices
- Experience with ATS systems
- Strong organizational skills
- Excellent interpersonal skills
- Confidentiality and professionalism`,
    benefits: `- Flexible hours (20-25 hrs/week)
- Pro-rated benefits
- Growth opportunities
- Supportive team culture`,
    salary: '80 - 100 MAD/hour',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function fetchJobs(): Promise<Job[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/jobs`);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    const jobs = await response.json();
    return jobs.length > 0 ? jobs : MOCK_JOBS;
  } catch (error) {
    console.log('API unavailable, using mock data');
    return MOCK_JOBS;
  }
}

export async function fetchJob(id: string): Promise<Job> {
  if (id.startsWith('mock-')) {
    const mockJob = MOCK_JOBS.find(job => job.id === id);
    if (mockJob) return mockJob;
    throw new Error('Job not found');
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/jobs/${id}`);
    if (!response.ok) throw new Error('Failed to fetch job');
    return response.json();
  } catch (error) {
    const mockJob = MOCK_JOBS.find(job => job.id === id);
    if (mockJob) return mockJob;
    throw new Error('Failed to fetch job');
  }
}

export async function submitApplication(formData: FormData): Promise<{ message: string; application: Application }> {
  const response = await fetch(`${API_BASE_URL}/api/applications`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to submit application');
  }
  return response.json();
}

const ADMIN_TOKEN = 'admin-secret-token';

function adminHeaders(): HeadersInit {
  return {
    'Authorization': `Bearer ${ADMIN_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

export async function fetchAdminJobs(): Promise<Job[]> {
  const response = await fetch(`${API_BASE_URL}/api/admin/jobs`, {
    headers: adminHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch jobs');
  return response.json();
}

export async function createJob(job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<Job> {
  const response = await fetch(`${API_BASE_URL}/api/admin/jobs`, {
    method: 'POST',
    headers: adminHeaders(),
    body: JSON.stringify(job),
  });
  if (!response.ok) throw new Error('Failed to create job');
  return response.json();
}

export async function updateJob(id: string, job: Partial<Job>): Promise<Job> {
  const response = await fetch(`${API_BASE_URL}/api/admin/jobs/${id}`, {
    method: 'PUT',
    headers: adminHeaders(),
    body: JSON.stringify(job),
  });
  if (!response.ok) throw new Error('Failed to update job');
  return response.json();
}

export async function deleteJob(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/admin/jobs/${id}`, {
    method: 'DELETE',
    headers: adminHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete job');
}

export async function fetchAdminApplications(type?: string, status?: string): Promise<ApplicationWithJob[]> {
  const params = new URLSearchParams();
  if (type) params.append('type', type);
  if (status) params.append('status', status);
  
  const response = await fetch(`${API_BASE_URL}/api/admin/applications?${params}`, {
    headers: adminHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch applications');
  return response.json();
}

export async function fetchAdminApplication(id: string): Promise<ApplicationWithJob> {
  const response = await fetch(`${API_BASE_URL}/api/admin/applications/${id}`, {
    headers: adminHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch application');
  return response.json();
}

export async function updateApplicationStatus(id: string, status: string, notes?: string): Promise<Application> {
  const response = await fetch(`${API_BASE_URL}/api/admin/applications/${id}`, {
    method: 'PATCH',
    headers: adminHeaders(),
    body: JSON.stringify({ status, notes }),
  });
  if (!response.ok) throw new Error('Failed to update application');
  return response.json();
}

export async function deleteApplication(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/admin/applications/${id}`, {
    method: 'DELETE',
    headers: adminHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete application');
}

export async function fetchAdminStats(): Promise<AdminStats> {
  const response = await fetch(`${API_BASE_URL}/api/admin/stats`, {
    headers: adminHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
}
