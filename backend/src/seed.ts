import { db, pool } from './db/index.js';
import { jobs, applications } from './db/schema.js';

const seedData = async () => {
  console.log('Seeding database...');

  try {
    await db.delete(applications);
    await db.delete(jobs);

    const jobsData = [
      {
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        location: 'Casablanca (Hybrid)',
        type: 'full-time' as const,
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
        status: 'open' as const,
      },
      {
        title: 'Backend Engineer',
        department: 'Engineering',
        location: 'Rabat (Remote)',
        type: 'full-time' as const,
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
        status: 'open' as const,
      },
      {
        title: 'Product Designer',
        department: 'Design',
        location: 'Marrakech (On-site)',
        type: 'full-time' as const,
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
        status: 'open' as const,
      },
      {
        title: 'DevOps Engineer',
        department: 'Operations',
        location: 'Tangier (Hybrid)',
        type: 'full-time' as const,
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
        status: 'open' as const,
      },
      {
        title: 'Marketing Intern',
        department: 'Marketing',
        location: 'Casablanca (On-site)',
        type: 'internship' as const,
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
        status: 'open' as const,
      },
      {
        title: 'Customer Success Manager',
        department: 'Customer Success',
        location: 'Fes (Remote)',
        type: 'full-time' as const,
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
        status: 'open' as const,
      },
      {
        title: 'Data Analyst',
        department: 'Analytics',
        location: 'Agadir (Hybrid)',
        type: 'contract' as const,
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
        status: 'open' as const,
      },
      {
        title: 'HR Coordinator',
        department: 'Human Resources',
        location: 'Oujda (On-site)',
        type: 'part-time' as const,
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
        status: 'open' as const,
      },
    ];

    const insertedJobs = await db.insert(jobs).values(jobsData).returning();
    console.log(`Inserted ${insertedJobs.length} jobs`);

    const applicationsData = [
      {
        jobId: insertedJobs[0].id,
        firstName: 'Youssef',
        lastName: 'El Amrani',
        email: 'youssef.elamrani@email.com',
        phone: '+212 6 12 34 56 78',
        resumeUrl: '/uploads/resumes/sample-resume.pdf',
        resumeOriginalName: 'Youssef_El_Amrani_CV.pdf',
        coverLetter: 'I am excited to apply for this position...',
        linkedinUrl: 'https://linkedin.com/in/youssefelamrani',
        isSpontaneous: false,
        status: 'pending' as const,
      },
      {
        jobId: insertedJobs[1].id,
        firstName: 'Fatima',
        lastName: 'Benali',
        email: 'fatima.benali@email.com',
        phone: '+212 6 98 76 54 32',
        resumeUrl: '/uploads/resumes/sample-resume-2.pdf',
        resumeOriginalName: 'Fatima_Benali_CV.pdf',
        coverLetter: 'With 5 years of backend development experience...',
        linkedinUrl: 'https://linkedin.com/in/fatimabenali',
        portfolioUrl: 'https://fatimabenali.dev',
        isSpontaneous: false,
        status: 'reviewed' as const,
      },
      {
        jobId: null,
        firstName: 'Karim',
        lastName: 'Tazi',
        email: 'karim.tazi@email.com',
        phone: '+212 6 45 67 89 01',
        resumeUrl: '/uploads/resumes/sample-resume-3.pdf',
        resumeOriginalName: 'Karim_Tazi_CV.pdf',
        coverLetter: 'I am reaching out to express my interest in joining your team...',
        isSpontaneous: true,
        status: 'pending' as const,
      },
    ];

    const insertedApplications = await db.insert(applications).values(applicationsData).returning();
    console.log(`Inserted ${insertedApplications.length} sample applications`);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.end();
  }
};

seedData();
