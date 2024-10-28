// src/controllers/eventController.ts
import { Request, Response } from 'express';
import * as eventQueries from '../db/queries/eventQueries';
import { Event } from '../db/model/eventmodel';

// Get all events
export const getAllEvents = (req: Request, res: Response) => {
    eventQueries.getAllEvents((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching events' });
        }
        res.status(200).json(results);
    });
};

// Create a new event
export const createEvent = (req: Request, res: Response) => {
    const eventData: Event = req.body;
    eventQueries.createEvent(eventData, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error creating event' });
        }
        res.status(201).json(results);
    });
};

// Update an event
export const updateEvent = (req: Request, res: Response) => {
    const eventId = parseInt(req.params.id);
    const eventData: Event = req.body;
    eventQueries.updateEvent(eventId, eventData, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating event' });
        }
        res.status(200).json(results);
    });
};

// Delete an event
export const deleteEvent = (req: Request, res: Response) => {
    const eventId = parseInt(req.params.id);
    eventQueries.deleteEvent(eventId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting event' });
        }
        res.status(204).send(); // No content
    });
};
