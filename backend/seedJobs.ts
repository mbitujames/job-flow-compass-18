import mongoose from 'mongoose';
import Company from './src/models/Company';
import Job from './src/models/Job';

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jobflow';

const companiesData = [
  {
    name: 'TechCorp',
    description: 'A leading technology company specializing in software development.',
    location: 'San Francisco, CA',
  },
  {
    name: 'StartupCo',
    description: 'A fast-growing startup focused on innovative solutions.',
    location: 'New York, NY',
  },
  {
    name: 'DataTech',
    description: 'Data analytics and machine learning company.',
    location: 'Remote',
  },
  {
    name: 'DesignStudio',
    description: 'Creative design agency specializing in UX/UI.',
    location: 'Austin, TX',
  },
];

const jobsData = [
  {
    title: 'Senior Frontend Developer',
    description: "We're looking for a senior frontend developer to join our growing team. You'll be working on cutting-edge React applications and helping shape our frontend architecture.",
    location: 'San Francisco, CA',
    salaryRange: '$120k - $180k',
    skillsRequired: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    status: 'open',
  },
  {
    title: 'Product Manager',
    description: 'Join our product team to drive strategy and execution for our flagship SaaS platform. Experience with B2B products and agile methodologies required.',
    location: 'New York, NY',
    salaryRange: '$130k - $160k',
    skillsRequired: ['Product Strategy', 'Agile', 'Analytics', 'User Research', 'Figma'],
    status: 'open',
  },
  {
    title: 'Data Scientist',
    description: 'Looking for a data scientist to work on machine learning models and data analysis. Strong Python and SQL skills required.',
    location: 'Remote',
    salaryRange: '$100k - $140k',
    skillsRequired: ['Python', 'SQL', 'Machine Learning', 'TensorFlow', 'Pandas'],
    status: 'open',
  },
  {
    title: 'UX Designer',
    description: "We're seeking a talented UX designer to create intuitive and beautiful user experiences for our mobile and web applications.",
    location: 'Austin, TX',
    salaryRange: '$85k - $110k',
    skillsRequired: ['Figma', 'Sketch', 'User Research', 'Prototyping', 'Design Systems'],
    status: 'open',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Company.deleteMany({});
    await Job.deleteMany({});

    // Insert companies
    const insertedCompanies = await Company.insertMany(companiesData);
    console.log('Inserted companies:', insertedCompanies.map(c => c.name));

    // Map company names to IDs
    const companyMap = insertedCompanies.reduce((acc, company) => {
      acc[company.name] = company._id;
      return acc;
    }, {} as Record<string, mongoose.Types.ObjectId>);

    // Insert jobs with companyId references
    const jobsToInsert = jobsData.map(job => ({
      ...job,
      companyId: companyMap[job.title.includes('Frontend') ? 'TechCorp' :
                          job.title.includes('Product') ? 'StartupCo' :
                          job.title.includes('Data Scientist') ? 'DataTech' :
                          'DesignStudio'],
    }));

    const insertedJobs = await Job.insertMany(jobsToInsert);
    console.log('Inserted jobs:', insertedJobs.map(j => j.title));

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
