import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-jobboard';

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
import authRoutes from './routes/auth';
import jobRoutes from './routes/job';
import applicationRoutes from './routes/application';
import companyRoutes from './routes/company';

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/companies', companyRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('MERN Job Board Backend is running');
});

export const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default app;
