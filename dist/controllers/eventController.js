"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getAllEvents = void 0;
const eventQueries = __importStar(require("../db/queries/eventQueries"));
// Get all events
const getAllEvents = (req, res) => {
    eventQueries.getAllEvents((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching events' });
        }
        res.status(200).json(results);
    });
};
exports.getAllEvents = getAllEvents;
// Create a new event
const createEvent = (req, res) => {
    const eventData = req.body;
    eventQueries.createEvent(eventData, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error creating event' });
        }
        res.status(201).json(results);
    });
};
exports.createEvent = createEvent;
// Update an event
const updateEvent = (req, res) => {
    const eventId = parseInt(req.params.id);
    const eventData = req.body;
    eventQueries.updateEvent(eventId, eventData, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating event' });
        }
        res.status(200).json(results);
    });
};
exports.updateEvent = updateEvent;
// Delete an event
const deleteEvent = (req, res) => {
    const eventId = parseInt(req.params.id);
    eventQueries.deleteEvent(eventId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting event' });
        }
        res.status(204).send(); // No content
    });
};
exports.deleteEvent = deleteEvent;
