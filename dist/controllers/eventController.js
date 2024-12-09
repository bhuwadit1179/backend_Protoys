"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEventController = exports.getEventByIdController = exports.deleteEventController = exports.updateEventControllerById = exports.createEventController = void 0;
const eventService_1 = require("../services/eventService");
const eventQueries_1 = require("../db/queries/eventQueries");
const createEventController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id; // Extract user ID from the auth middleware
        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const eventData = Object.assign(Object.assign({}, req.body), { created_by: user_id });
        yield (0, eventService_1.createEventService)(eventData); // Delegate business logic to the service
        res.status(201).json({ message: 'Event created successfully!' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
});
exports.createEventController = createEventController;
const updateEventControllerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const eventId = parseInt(req.params.event_id, 10);
        const eventData = req.body;
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id; // Extract user ID from the auth middleware
        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        yield (0, eventService_1.updateEventService)(eventId, eventData);
        res.status(200).json({ message: `Event with ID ${eventId} updated successfully.` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
});
exports.updateEventControllerById = updateEventControllerById;
// delete event
const deleteEventController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = parseInt(req.params.event_id, 10);
        // Check if the event ID is valid
        if (isNaN(eventId)) {
            res.status(400).json({ message: 'Invalid event ID' });
            return; // Early return to avoid further execution
        }
        // Attempt to delete the event
        yield (0, eventQueries_1.deleteEvent)(eventId);
        // Successfully deleted
        res.status(200).json({ message: `Event with ID ${eventId} deleted successfully.` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
});
exports.deleteEventController = deleteEventController;
const getEventByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = parseInt(req.params.id, 10);
    if (isNaN(eventId)) {
        res.status(400).json({ message: 'Invalid event ID' });
    }
    try {
        const event = yield (0, eventQueries_1.getEventById)(eventId);
        if (!event) {
            res.status(404).json({ message: `Event with ID ${eventId} not found` });
        }
        res.status(200).json({ message: 'Event Retrieved!', data: event });
    }
    catch (error) {
        console.error(`[getEventByIdController] Error:`, error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
});
exports.getEventByIdController = getEventByIdController;
const getAllEventController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, eventQueries_1.getEvent)();
        res.status(200).json({ message: 'Success', data });
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
});
exports.getAllEventController = getAllEventController;
