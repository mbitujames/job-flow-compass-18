import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server';

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-jobboard-test';
    await mongoose.connect(MONGO_URI);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth API Endpoints', () => {
  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('User created successfully');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });

  it('should get user profile with valid token', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });
    const token = loginRes.body.token;

    const profileRes = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(profileRes.statusCode).toEqual(200);
    expect(profileRes.body.email).toBe('testuser@example.com');
    expect(profileRes.body.name).toBe('Test User');
    expect(profileRes.body.passwordHash).toBeUndefined();
  });
});
