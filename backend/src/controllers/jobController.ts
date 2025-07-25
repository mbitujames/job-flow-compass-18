import { Request, Response } from 'express';
import Job from '../models/Job';

export const createJob = async (req: Request, res: Response) => {
  try {
    const { title, description, companyId, location, salaryRange, skillsRequired, status } = req.body;

    if (!title || !description || !companyId) {
      return res.status(400).json({ message: 'Title, description, and companyId are required' });
    }

    const newJob = new Job({
      title,
      description,
      companyId,
      location,
      salaryRange,
      skillsRequired,
      status: status || 'open',
    });

    await newJob.save();

    return res.status(201).json(newJob);
  } catch (error) {
    console.error('Create job error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find().populate('companyId');
    return res.json(jobs);
  } catch (error) {
    console.error('Get jobs error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id).populate('companyId');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    return res.json(job);
  } catch (error) {
    console.error('Get job by ID error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    return res.json(updatedJob);
  } catch (error) {
    console.error('Update job error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    return res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
