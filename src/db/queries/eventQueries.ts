// src/db/queries/eventQueries.ts
import db from '../connection';
import mysql from 'mysql';
import { Event } from '../model/eventmodel';

// Function to get all events
export const getAllEvents = (callback: (err: mysql.MysqlError | null, results?: Event[]) => void) => {
    db.query('SELECT * FROM events', callback);
};

// Function to create a new event
export const createEvent = (eventData: Event, callback: (err: mysql.MysqlError | null, results?: mysql.OkPacket) => void) => {
    const query = `
        INSERT INTO events (customer_id, event_name, start_date, end_date, location, description) 
        VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(query, [eventData.customer_id, eventData.event_name, eventData.start_date, eventData.end_date, eventData.location, eventData.description], callback);
};

// Function to update an event
export const updateEvent = (eventId: number, eventData: Event, callback: (err: mysql.MysqlError | null, results?: mysql.OkPacket) => void) => {
    const query = `
        UPDATE events
        SET customer_id = ?, event_name = ?, start_date = ?, end_date = ?, location = ?, description = ?
        WHERE event_id = ?`;

    db.query(query, [eventData.customer_id, eventData.event_name, eventData.start_date, eventData.end_date, eventData.location, eventData.description, eventId], callback);
};

// Function to delete an event
export const deleteEvent = (eventId: number, callback: (err: mysql.MysqlError | null, results?: mysql.OkPacket) => void) => {
    const query = 'DELETE FROM events WHERE event_id = ?';

    db.query(query, [eventId], callback);
};
