"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEventById = exports.insertEvent = exports.getEventById = exports.getEvent = void 0;
const connection_1 = __importDefault(require("../connection"));
const getEvent = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM events';
        connection_1.default.query(query, (error, results) => {
            if (error)
                return reject(error);
            resolve(results || null);
        });
    });
};
exports.getEvent = getEvent;
const getEventById = (event_id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM events WHERE event_id = ?';
        connection_1.default.query(query, [event_id], (error, results) => {
            if (error)
                return reject(error);
            resolve(results[0] || null);
        });
    });
};
exports.getEventById = getEventById;
const insertEvent = (eventData) => {
    return new Promise((resolve, reject) => {
        const { event_name, description, location, start_date, end_date, created_by, event_type, event_code, } = eventData;
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
        connection_1.default.query(query, [
            event_name,
            description || null,
            location || null,
            start_date || null,
            end_date || null,
            created_by,
            event_type,
            event_code,
        ], (error) => {
            if (error)
                return reject(error);
            resolve();
        });
    });
};
exports.insertEvent = insertEvent;
const updateEventById = (eventId, eventData) => {
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
        connection_1.default.query(query, values, (error, results) => {
            if (error)
                return reject(error);
            // Check affectedRows to verify if a row was updated
            if (results.affectedRows === 0) {
                return reject(new Error(`Event with ID ${eventId} does not exist.`));
            }
            resolve();
        });
    });
};
exports.updateEventById = updateEventById;
const deleteEvent = (eventId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM events WHERE event_id = ?';
        connection_1.default.query(query, [eventId], (error, results) => {
            if (error)
                return reject(error);
            if (results.affectedRows === 0) {
                return reject(new Error(`Event with ID ${eventId} does not exist.`));
            }
            resolve();
        });
    });
};
exports.deleteEvent = deleteEvent;
