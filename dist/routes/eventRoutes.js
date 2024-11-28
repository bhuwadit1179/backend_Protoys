"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/route/route.ts
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const authmiddleware_1 = require("../middleware/authmiddleware");
const router = express_1.default.Router();
// Define routes
router.put('/events/:event_id', authmiddleware_1.authMiddleware, eventController_1.updateEventControllerById);
router.post('/events', authmiddleware_1.authMiddleware, eventController_1.createEventController);
// router.put('/events/:id', updateEvent);
router.delete('/events/:event_id', authmiddleware_1.authMiddleware, eventController_1.deleteEventController);
exports.default = router;
