import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Job {
  _id: string;
  title: string;
  description: string;
  companyId: {
    _id: string;
    name: string;
    description: string;
    website?: string;
    location?: string;
  };
  location?: string;
  salaryRange?: string;
  skillsRequired?: string[];
  status: 'open' | 'closed';
  postedAt: string;
  updatedAt: string;
}

interface Application {
  _id: string;
  jobId: string;
  userId: string;
  resumeUrl?: string;
  coverLetter?: string;
  status: 'applied' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: string;
  updatedAt: string;
  job?: Job;
}

interface JobContextType {
  jobs: Job[];
  applications: Application[];
  fetchJobs: () => Promise<void>;
  fetchApplications: () => Promise<void>;
  applyToJob: (jobId: string, coverLetter?: string) => Promise<boolean>;
  createJob: (jobData: any) => Promise<boolean>;
  updateApplicationStatus: (applicationId: string, status: string) => Promise<boolean>;
  isLoading: boolean;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchJobs();
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated]);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const jobsData = await response.json();
        setJobs(jobsData);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('/api/applications', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const applicationsData = await response.json();
        setApplications(applicationsData);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const applyToJob = async (jobId: string, coverLetter?: string): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ jobId, coverLetter }),
      });

      if (response.ok) {
        await fetchApplications();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error applying to job:', error);
      return false;
    }
  };

  const createJob = async (jobData: any): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;

      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        await fetchJobs();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error creating job:', error);
      return false;
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;

      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        await fetchApplications();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating application status:', error);
      return false;
    }
  };

  const value = {
    jobs,
    applications,
    fetchJobs,
    fetchApplications,
    applyToJob,
    createJob,
    updateApplicationStatus,
    isLoading,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};