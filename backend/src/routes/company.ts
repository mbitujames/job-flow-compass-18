import express from 'express';
import { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany } from '../controllers/companyController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getCompanies);
router.post('/', authenticateJWT, createCompany);
router.get('/:id', getCompanyById);
router.put('/:id', authenticateJWT, updateCompany);
router.delete('/:id', authenticateJWT, deleteCompany);

export default router;