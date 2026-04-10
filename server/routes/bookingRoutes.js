import express from "express";
import { changeBookingStatus, checkAvailabilityOfCar, createBooking, getOwnerBookings, getUserBookings } from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";
import { ownerOnly, userOnly } from "../middleware/roleCheck.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityOfCar)
bookingRouter.post('/create', protect, userOnly, createBooking)
bookingRouter.get('/user', protect, userOnly, getUserBookings)
bookingRouter.get('/owner', protect, ownerOnly, getOwnerBookings)
bookingRouter.post('/change-status', protect, ownerOnly, changeBookingStatus)

export default bookingRouter;