import express from 'express';
import { createApplication, getApplications, getApplicationById, updateApplication, deleteApplication } from '../controllers/applicationController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticateJWT, getApplications);
router.post('/', authenticateJWT, createApplication);
router.get('/:id', authenticateJWT, getApplicationById);
router.put('/:id', authenticateJWT, updateApplication);
router.delete('/:id', authenticateJWT, deleteApplication);

export default router;