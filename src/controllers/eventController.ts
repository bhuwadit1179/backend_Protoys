import { Request, Response } from 'express';
import { Event } from '../db/model/eventModel'; // Import Event interface
import { createEventService, updateEventService } from '../services/eventService';
import { log } from 'console';
import { deleteEvent, getEvent, getEventById } from '../db/queries/eventQueries';

export const createEventController = async (req: Request, res: Response) => {
    try {
        const user_id = req.user?.user_id; // Extract user ID from the auth middleware
        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        const eventData = {
            ...req.body,
            created_by: user_id, // Pass the creator's ID
        };

        await createEventService(eventData); // Delegate business logic to the service
        res.status(201).json({ message: 'Event created successfully!' });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

export const updateEventControllerById = async (req: Request, res: Response) => {

    try {
        const eventId = parseInt(req.params.event_id, 10);
        const eventData = req.body;
        const user_id = req.user?.user_id; // Extract user ID from the auth middleware
        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        await updateEventService(eventId, eventData);

        res.status(200).json({ message: `Event with ID ${eventId} updated successfully.` });

    }
    catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

// delete event
export const deleteEventController = async (req: Request, res: Response) => {
    try {
        const eventId = parseInt(req.params.event_id, 10);

        // Check if the event ID is valid
        if (isNaN(eventId)) {
            res.status(400).json({ message: 'Invalid event ID' });
            return // Early return to avoid further execution
        }

        // Attempt to delete the event
        await deleteEvent(eventId);


        // Successfully deleted
        res.status(200).json({ message: `Event with ID ${eventId} deleted successfully.` });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}


export const getEventByIdController = async (req: Request, res: Response) => {
    const eventId = parseInt(req.params.id, 10);

    if (isNaN(eventId)) {
        res.status(400).json({ message: 'Invalid event ID' });
    }

    try {
        const event = await getEventById(eventId);
        if (!event) {
            res.status(404).json({ message: `Event with ID ${eventId} not found` });
        }
        res.status(200).json({ message: 'Event Retrieved!', data: event });
    } catch (error: any) {
        console.error(`[getEventByIdController] Error:`, error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};


export const getAllEventController = async (req: Request, res: Response) => {
    try {
        const data = await getEvent();
        res.status(200).json({ message: 'Success', data });
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
}