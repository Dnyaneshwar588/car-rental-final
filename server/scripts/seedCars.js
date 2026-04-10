import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Car from "../models/Car.js";

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'car-rental'
  });
};

const seed = async () => {
  const ownerEmail = "owner@carrental.in";
  const ownerPassword = "Owner@1234";

  let owner = await User.findOne({ email: ownerEmail });
  if (!owner) {
    const hashedPassword = await bcrypt.hash(ownerPassword, 10);
    owner = await User.create({
      name: "CarRental Owner",
      email: ownerEmail,
      password: hashedPassword,
      role: "owner",
    });
  }

  const cars = [
    {
      brand: "Maruti Suzuki",
      model: "Swift",
      image:
        "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=80",
      year: 2023,
      category: "Hatchback",
      seating_capacity: 4,
      fuel_type: "Petrol",
      transmission: "Manual",
      pricePerDay: 1600,
      location: "Mumbai",
      description:
        "A city-friendly hatchback with peppy performance and great mileage for quick urban trips.",
    },
    {
      brand: "Hyundai",
      model: "Creta",
      image:
        "https://images.unsplash.com/photo-1549927681-0b673b8243ab?auto=format&fit=crop&w=1600&q=80",
      year: 2024,
      category: "SUV",
      seating_capacity: 5,
      fuel_type: "Diesel",
      transmission: "Automatic",
      pricePerDay: 2600,
      location: "Bengaluru",
      description:
        "A premium compact SUV with a refined cabin, smooth ride, and strong road presence.",
    },
    {
      brand: "Tata",
      model: "Nexon",
      image:
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80",
      year: 2022,
      category: "SUV",
      seating_capacity: 5,
      fuel_type: "Petrol",
      transmission: "Automatic",
      pricePerDay: 2200,
      location: "Delhi",
      description:
        "A compact SUV with a confident stance, great safety ratings, and easy city handling.",
    },
    {
      brand: "Mahindra",
      model: "XUV700",
      image:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=80",
      year: 2023,
      category: "SUV",
      seating_capacity: 7,
      fuel_type: "Diesel",
      transmission: "Automatic",
      pricePerDay: 3200,
      location: "Pune",
      description:
        "A spacious 7-seater SUV with punchy performance and a tech-forward cabin for long drives.",
    },
    {
      brand: "Kia",
      model: "Seltos",
      image:
        "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=80",
      year: 2024,
      category: "SUV",
      seating_capacity: 5,
      fuel_type: "Petrol",
      transmission: "Automatic",
      pricePerDay: 2800,
      location: "Hyderabad",
      description:
        "A bold, feature-rich SUV with a comfortable ride and premium interiors.",
    },
    {
      brand: "Toyota",
      model: "Innova Crysta",
      image:
        "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1600&q=80",
      year: 2022,
      category: "MPV",
      seating_capacity: 7,
      fuel_type: "Diesel",
      transmission: "Automatic",
      pricePerDay: 3000,
      location: "Chennai",
      description:
        "A dependable MPV with generous space, ideal for family trips and group travel.",
    },
    {
      brand: "Honda",
      model: "City",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
      year: 2021,
      category: "Sedan",
      seating_capacity: 5,
      fuel_type: "Petrol",
      transmission: "Automatic",
      pricePerDay: 2100,
      location: "Kolkata",
      description:
        "A refined sedan with a smooth drive, quiet cabin, and excellent rear-seat comfort.",
    },
    {
      brand: "Skoda",
      model: "Slavia",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
      year: 2023,
      category: "Sedan",
      seating_capacity: 5,
      fuel_type: "Petrol",
      transmission: "Manual",
      pricePerDay: 2300,
      location: "Jaipur",
      description:
        "A sporty sedan with sharp handling and a clean, premium dashboard layout.",
    },
    {
      brand: "MG",
      model: "Hector",
      image:
        "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=80",
      year: 2022,
      category: "SUV",
      seating_capacity: 5,
      fuel_type: "Petrol",
      transmission: "Automatic",
      pricePerDay: 2700,
      location: "Ahmedabad",
      description:
        "A spacious SUV with a large cabin, panoramic sunroof, and smooth highway comfort.",
    },
    {
      brand: "Tata",
      model: "Punch EV",
      image:
        "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1600&q=80",
      year: 2024,
      category: "Compact SUV",
      seating_capacity: 5,
      fuel_type: "Electric",
      transmission: "Automatic",
      pricePerDay: 2400,
      location: "Kochi",
      description:
        "A compact electric SUV with quiet performance, fast charging, and nimble handling.",
    },
  ];

  for (const car of cars) {
    await Car.findOneAndUpdate(
      { brand: car.brand, model: car.model, location: car.location },
      { ...car, owner: owner._id, isAvaliable: true },
      { upsert: true, new: true }
    );
  }

  const totalCars = await Car.countDocuments();
  console.log(`Seed complete. Total cars in DB: ${totalCars}`);
};

try {
  await connect();
  await seed();
} catch (error) {
  console.error(error);
} finally {
  await mongoose.disconnect();
}
