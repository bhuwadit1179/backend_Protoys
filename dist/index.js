"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./route/route"));
require("./db/connection"); // Ensure the database connection is established
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use('/api', route_1.default); // Use a base URL for your API
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
