import bcrypt from "bcrypt";
import User from "../models/User.js";

// Ensures a single owner-admin account exists for controlled owner access.
export const bootstrapAdmin = async () => {
  const adminEmail = (process.env.ADMIN_EMAIL || "dnyaneshwarkhune723@gmail.com").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "@Manikk9371";
  const adminName = process.env.ADMIN_NAME || "Admin";

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const existing = await User.findOne({ email: adminEmail });

  if (!existing) {
    await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "owner",
    });
    console.log("Admin account created");
    return;
  }

  existing.name = adminName;
  existing.password = hashedPassword;
  existing.role = "owner";
  await existing.save();
  console.log("Admin account synced");
};
