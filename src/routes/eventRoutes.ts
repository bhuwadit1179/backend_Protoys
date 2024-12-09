// src/route/route.ts
import express from 'express';
import {
    createEventController,
    deleteEventController,
    getAllEventController,
    getEventByIdController,
    updateEventControllerById
} from '../controllers/eventController';
import { authMiddleware } from '../middleware/authmiddleware';

const router = express.Router();

// Define routes
router.put('/events/:event_id', authMiddleware, updateEventControllerById);
router.post('/events', authMiddleware, createEventController);
router.get('/events', authMiddleware, getAllEventController);
router.get('/events/:id', authMiddleware, getEventByIdController);
router.delete('/events/:event_id', authMiddleware, deleteEventController);

export default router;
