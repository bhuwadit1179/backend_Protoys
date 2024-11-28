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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEventService = exports.updateEventService = exports.getEventUseId = exports.createEventService = void 0;
const eventQueries_1 = require("../db/queries/eventQueries");
// create event
const createEventService = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
    // Perform validation
    if (!eventData.event_name) {
        throw new Error('Event name is required.');
    }
    if (new Date(eventData.start_date) > new Date(eventData.end_date)) {
        throw new Error('Start date cannot be after end date.');
    }
    const { event_name, description } = eventData, otherDetails = __rest(eventData, ["event_name", "description"]);
    // Call the query to insert the event into the database
    yield (0, eventQueries_1.insertEvent)(eventData);
});
exports.createEventService = createEventService;
// get event
const getEventUseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const eventId = (_a = req.event) === null || _a === void 0 ? void 0 : _a.event_id;
    if (eventId === undefined) {
        res.status(400).json({ message: 'Event ID not found in request.' });
        return;
    }
    try {
        const event = yield (0, eventQueries_1.getEventById)(eventId);
        res.status(200).json({ event });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
});
exports.getEventUseId = getEventUseId;
const updateEventService = (eventId, eventData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!eventId || typeof eventId !== 'number') {
        throw new Error('Invalid event ID');
    }
    if (!eventData || Object.keys(eventData).length === 0) {
        throw new Error('No event data provided to update');
    }
    try {
        // Call the query to update the event in the database
        yield (0, eventQueries_1.updateEventById)(eventId, eventData);
        console.log(`Event with ID ${eventId} has been successfully updated.`);
    }
    catch (error) {
        // Narrow the type of error
        if (error instanceof Error) {
            console.error(`Failed to update event with ID ${eventId}:`, error.message);
            throw error;
        }
        else {
            console.error(`Failed to update event with ID ${eventId}:`, error);
            throw new Error('An unknown error occurred');
        }
    }
});
exports.updateEventService = updateEventService;
// delete event
const deleteEventService = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(eventId);
    if (!eventId || typeof eventId !== 'number') {
        throw new Error('Invalid event ID');
    }
    try {
        // Call the query to delete the event from the database
        yield (0, eventQueries_1.deleteEvent)(eventId);
        console.log(`Event with ID ${eventId} has been successfully deleted.`);
    }
    catch (error) {
        // Narrow the type of error
        if (error instanceof Error) {
            console.error(`Failed to delete event with ID ${eventId}:`, error.message);
            throw error;
        }
        else {
            console.error(`Failed to delete event with ID ${eventId}:`, error);
            throw new Error('An unknown error occurred');
        }
    }
});
exports.deleteEventService = deleteEventService;
