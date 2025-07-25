import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server';
import User from '../models/User';
import Job from '../models/Job';

describe('Job API Endpoints', () => {
  let token: string;
  let jobId: string;

  beforeAll(async () => {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-jobboard-test';
    await mongoose.connect(MONGO_URI);

    // Create a test user and get auth token
    await User.deleteMany({});
    await Job.deleteMany({});

    const signupRes = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Job Poster',
        email: 'jobposter@example.com',
        password: 'password123',
        role: 'employer',
      });
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'jobposter@example.com',
        password: 'password123',
      });
    token = loginRes.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new job', async () => {
    const res = await request(app)
      .post('/api/jobs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Software Engineer',
        description: 'Develop and maintain software applications.',
        companyId: '000000000000000000000000', // Replace with valid companyId or mock
        location: 'Remote',
        salaryRange: '100000-120000',
        skillsRequired: ['JavaScript', 'Node.js', 'React'],
        status: 'open',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe('Software Engineer');
    jobId = res.body._id;
  });

  it('should get all jobs', async () => {
    const res = await request(app).get('/api/jobs');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get job by id', async () => {
    const res = await request(app).get(`/api/jobs/${jobId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toBe(jobId);
  });

  it('should update job', async () => {
    const res = await request(app)
      .put(`/api/jobs/${jobId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'closed' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('closed');
  });

  it('should delete job', async () => {
    const res = await request(app)
      .delete(`/api/jobs/${jobId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Job deleted successfully');
  });
});
