"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/route/route.ts
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const router = express_1.default.Router();
// Define routes
router.get('/events', eventController_1.getAllEvents);
router.post('/events', eventController_1.createEvent);
router.put('/events/:id', eventController_1.updateEvent);
router.delete('/events/:id', eventController_1.deleteEvent);
exports.default = router;
