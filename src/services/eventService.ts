import { getEvent, getEventById, insertEvent, deleteEvent, updateEventById } from '../db/queries/eventQueries';
import { Event } from '../db/model/eventModel';
import { Request, Response } from 'express';

// create event
export const createEventService = async (eventData: any): Promise<void> => {
    // Perform validation
    if (!eventData.event_name) {
        throw new Error('Event name is required.');
    }

    if (new Date(eventData.start_date) > new Date(eventData.end_date)) {
        throw new Error('Start date cannot be after end date.');
    }

    const { event_name, description, ...otherDetails } = eventData;

    // Call the query to insert the event into the database
    await insertEvent(eventData);
};

// get event
export const getEventUseId = async (req: Request, res: Response): Promise<void> => {
    const eventId = req.event?.event_id;
    if (eventId === undefined) {
        res.status(400).json({ message: 'Event ID not found in request.' });
        return
    }
    try {
        const event = await getEventById(eventId);
        res.status(200).json({ event });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }

}
export const updateEventService = async (eventId: number, eventData: Event): Promise<void> => {
    if (!eventId || typeof eventId !== 'number') {
        throw new Error('Invalid event ID');
    }

    if (!eventData || Object.keys(eventData).length === 0) {
        throw new Error('No event data provided to update');
    }

    try {
        // Call the query to update the event in the database
        await updateEventById(eventId, eventData);
        console.log(`Event with ID ${eventId} has been successfully updated.`);
    } catch (error) {
        // Narrow the type of error
        if (error instanceof Error) {
            console.error(`Failed to update event with ID ${eventId}:`, error.message);
            throw error;
        } else {
            console.error(`Failed to update event with ID ${eventId}:`, error);
            throw new Error('An unknown error occurred');
        }
    }
}

// delete event
export const deleteEventService = async (eventId: number): Promise<void> => {
    console.log(eventId)
    if (!eventId || typeof eventId !== 'number') {
        throw new Error('Invalid event ID');
    }

    try {
        // Call the query to delete the event from the database
        await deleteEvent(eventId);
        console.log(`Event with ID ${eventId} has been successfully deleted.`);
    } catch (error) {
        // Narrow the type of error
        if (error instanceof Error) {
            console.error(`Failed to delete event with ID ${eventId}:`, error.message);
            throw error;
        } else {
            console.error(`Failed to delete event with ID ${eventId}:`, error);
            throw new Error('An unknown error occurred');
        }
    }
}