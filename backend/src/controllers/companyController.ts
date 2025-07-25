import { Request, Response } from 'express';
import Company from '../models/Company';

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, description, website, location } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(409).json({ message: 'Company with this name already exists' });
    }

    const newCompany = new Company({
      name,
      description,
      website,
      location,
    });

    await newCompany.save();

    return res.status(201).json(newCompany);
  } catch (error) {
    console.error('Create company error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find();
    return res.json(companies);
  } catch (error) {
    console.error('Get companies error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    return res.json(company);
  } catch (error) {
    console.error('Get company by ID error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    return res.json(updatedCompany);
  } catch (error) {
    console.error('Update company error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    return res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Delete company error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};