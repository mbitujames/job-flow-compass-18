import express from 'express';
import { createJob, getJobs, getJobById, updateJob, deleteJob } from '../controllers/jobController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getJobs);
router.post('/', authenticateJWT, createJob);
router.get('/:id', getJobById);
router.put('/:id', authenticateJWT, updateJob);
router.delete('/:id', authenticateJWT, deleteJob);

export default router;
