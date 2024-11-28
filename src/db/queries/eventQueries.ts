import connection from '../connection';
import { Event } from '../model/eventModel';


const getEvent = (): Promise<Event | null> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM events';
        connection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results || null);
        });
    });
}
const getEventById = (event_id: number): Promise<Event | null> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM events WHERE event_id = ?';
        connection.query(query, [event_id], (error, results) => {
            if (error) return reject(error);
            resolve(results[0] || null);
        });
    });
}

const insertEvent = (eventData: Event): Promise<void> => {
    return new Promise((resolve, reject) => {
        const {
            event_name,
            description,
            location,
            start_date,
            end_date,
            created_by,
            event_type,
            event_code,
        } = eventData;

        const query = `
            INSERT INTO events (
            event_name,
            description,
            location,
            start_date,
            end_date,
            created_by,
            event_type,
            event_code
            ) VALUES ( ?, ?, ?, ?,  ?, ?, ?, ?)
        `;
        connection.query(query, [
            event_name,
            description || null,
            location || null,
            start_date || null,
            end_date || null,
            created_by,
            event_type,
            event_code,
        ], (error) => {
            if (error) return reject(error);
            resolve();
        });
    }
    )
}

const updateEventById = (eventId: number, eventData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE events SET
            event_name = ?,
            description = ?,
            location = ?,
            start_date = ?,
            end_date = ?,
            event_type = ?
            WHERE event_id = ?
        `;
        const values = [
            eventData.event_name,
            eventData.description,
            eventData.location,
            eventData.start_date,
            eventData.end_date,
            eventData.event_type,
            eventId
        ];

        connection.query(query, values, (error, results) => {
            if (error) return reject(error);

            // Check affectedRows to verify if a row was updated
            if (results.affectedRows === 0) {
                return reject(new Error(`Event with ID ${eventId} does not exist.`));
            }

            resolve();
        });
    });
};


const deleteEvent = (eventId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM events WHERE event_id = ?';
        connection.query(query, [eventId], (error, results) => {
            if (error) return reject(error);
            if (results.affectedRows === 0) {
                return reject(new Error(`Event with ID ${eventId} does not exist.`));
            }
            resolve();
        });
    });
}

export { getEvent, getEventById, insertEvent, updateEventById, deleteEvent };