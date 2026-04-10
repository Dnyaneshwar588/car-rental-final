import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

import cors from "cors";
import connectDB from "./configs/db.js";
import { bootstrapAdmin } from "./configs/bootstrapAdmin.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express App
const app = express()

// Connect Database
await connectDB()
await bootstrapAdmin()

// Middleware
app.use(cors());
app.use(express.json());

// Serve Frontend Static Files
app.use(express.static(path.join(__dirname, "../client/dist")));

// API Routes
app.use('/api/user', userRouter)
app.use('/api/owner', ownerRouter)
app.use('/api/bookings', bookingRouter)

// Serve React App - SPA fallback route (commented out for API-only mode)
// Uncomment when deploying with built frontend
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))