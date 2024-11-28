// src/route/route.ts
import express from 'express';
import {
    createEventController,
    deleteEventController,
    updateEventControllerById
} from '../controllers/eventController';
import { authMiddleware } from '../middleware/authmiddleware';

const router = express.Router();

// Define routes
router.put('/events/:event_id', authMiddleware, updateEventControllerById);
router.post('/events', authMiddleware, createEventController);
// router.put('/events/:id', updateEvent);
router.delete('/events/:event_id', authMiddleware, deleteEventController);

export default router;
