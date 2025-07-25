import { Request, Response } from 'express';
import Application from '../models/Application';

export const createApplication = async (req: Request, res: Response) => {
  try {
    const { jobId, resumeUrl, coverLetter } = req.body;
    // @ts-ignore
    const userId = req.user.userId;

    if (!jobId) {
      return res.status(400).json({ message: 'JobId is required' });
    }

    // Check if user already applied for this job
    const existingApplication = await Application.findOne({ jobId, userId });
    if (existingApplication) {
      return res.status(409).json({ message: 'You have already applied for this job' });
    }

    const newApplication = new Application({
      jobId,
      userId,
      resumeUrl,
      coverLetter,
    });

    await newApplication.save();

    return res.status(201).json(newApplication);
  } catch (error) {
    console.error('Create application error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getApplications = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    // @ts-ignore
    const userRole = req.user.role;

    let applications;
    if (userRole === 'employer') {
      // Get applications for jobs posted by this employer's company
      applications = await Application.find()
        .populate({
          path: 'jobId',
          populate: {
            path: 'companyId'
          }
        })
        .populate('userId', '-passwordHash');
    } else {
      // Get applications by this user
      applications = await Application.find({ userId })
        .populate({
          path: 'jobId',
          populate: {
            path: 'companyId'
          }
        });
    }

    return res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate({
        path: 'jobId',
        populate: {
          path: 'companyId'
        }
      })
      .populate('userId', '-passwordHash');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    return res.json(application);
  } catch (error) {
    console.error('Get application by ID error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateApplication = async (req: Request, res: Response) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    return res.json(updatedApplication);
  } catch (error) {
    console.error('Update application error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.id);
    
    if (!deletedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    return res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete application error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};