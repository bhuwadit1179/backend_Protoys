"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getAllEvents = void 0;
// src/db/queries/eventQueries.ts
const connection_1 = __importDefault(require("../connection"));
// Function to get all events
const getAllEvents = (callback) => {
    connection_1.default.query('SELECT * FROM events', callback);
};
exports.getAllEvents = getAllEvents;
// Function to create a new event
const createEvent = (eventData, callback) => {
    const query = `
        INSERT INTO events (customer_id, event_name, start_date, end_date, location, description) 
        VALUES (?, ?, ?, ?, ?, ?)`;
    connection_1.default.query(query, [eventData.customer_id, eventData.event_name, eventData.start_date, eventData.end_date, eventData.location, eventData.description], callback);
};
exports.createEvent = createEvent;
// Function to update an event
const updateEvent = (eventId, eventData, callback) => {
    const query = `
        UPDATE events
        SET customer_id = ?, event_name = ?, start_date = ?, end_date = ?, location = ?, description = ?
        WHERE event_id = ?`;
    connection_1.default.query(query, [eventData.customer_id, eventData.event_name, eventData.start_date, eventData.end_date, eventData.location, eventData.description, eventId], callback);
};
exports.updateEvent = updateEvent;
// Function to delete an event
const deleteEvent = (eventId, callback) => {
    const query = 'DELETE FROM events WHERE event_id = ?';
    connection_1.default.query(query, [eventId], callback);
};
exports.deleteEvent = deleteEvent;
