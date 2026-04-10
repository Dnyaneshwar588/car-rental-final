import nodemailer from "nodemailer";

// Create reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

// Generic send mail helper
export const sendMail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"CarRental" <${process.env.SMTP_EMAIL}>`,
            to,
            subject,
            html,
        });
        console.log(`✅ Email sent to ${to}`);
    } catch (error) {
        console.error(`❌ Email failed to ${to}:`, error.message);
    }
};

// ─── Email Templates ────────────────────────────────────────

export const sendWelcomeEmail = async (to, name) => {
    const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🚗 Welcome to CarRental!</h1>
        </div>
        <div style="padding: 30px;">
            <h2 style="color: #1e3a5f; margin-top: 0;">Hi ${name}! 👋</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                Your account has been created successfully. You're all set to explore and book amazing cars for your next trip!
            </p>
            <div style="background: #f0f7ff; border-left: 4px solid #2563eb; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #1e3a5f; font-weight: 600;">What you can do:</p>
                <ul style="color: #4b5563; margin: 8px 0 0 0; padding-left: 20px;">
                    <li>Browse our premium car collection</li>
                    <li>Book cars with flexible pickup dates</li>
                    <li>Track all your bookings in one place</li>
                </ul>
            </div>
            <p style="color: #6b7280; font-size: 14px;">If you have any questions, feel free to reach out to our support team.</p>
        </div>
        <div style="background: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} CarRental. All rights reserved.</p>
        </div>
    </div>`;

    await sendMail(to, "Welcome to CarRental! 🚗", html);
};

export const sendPasswordResetEmail = async (to, name, resetUrl) => {
    const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: linear-gradient(135deg, #dc2626 0%, #f97316 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🔑 Password Reset</h1>
        </div>
        <div style="padding: 30px;">
            <h2 style="color: #1e3a5f; margin-top: 0;">Hi ${name},</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                We received a request to reset your password. Click the button below to set a new password.
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background: linear-gradient(135deg, #2563eb, #1e40af); color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; display: inline-block;">
                    Reset Password
                </a>
            </div>
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                    ⚠️ This link expires in <strong>15 minutes</strong>. If you didn't request this, please ignore this email.
                </p>
            </div>
            <p style="color: #6b7280; font-size: 13px;">If the button doesn't work, copy and paste this link: <br/>
                <a href="${resetUrl}" style="color: #2563eb; word-break: break-all;">${resetUrl}</a>
            </p>
        </div>
        <div style="background: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} CarRental. All rights reserved.</p>
        </div>
    </div>`;

    await sendMail(to, "Reset Your Password - CarRental", html);
};

export const sendBookingConfirmationEmail = async (to, name, booking) => {
    const { car, pickupDate, returnDate, price } = booking;
    const pickup = new Date(pickupDate).toLocaleDateString("en-IN", { dateStyle: "long" });
    const returnD = new Date(returnDate).toLocaleDateString("en-IN", { dateStyle: "long" });

    const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">✅ Booking Confirmed!</h1>
        </div>
        <div style="padding: 30px;">
            <h2 style="color: #1e3a5f; margin-top: 0;">Hi ${name},</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                Great news! Your car booking has been confirmed. Here are the details:
            </p>
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin: 20px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Car</td>
                        <td style="padding: 8px 0; color: #1e3a5f; font-weight: 600; text-align: right;">${car.brand} ${car.model} (${car.year})</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb;">Category</td>
                        <td style="padding: 8px 0; color: #1e3a5f; text-align: right; border-top: 1px solid #e5e7eb;">${car.category}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb;">Location</td>
                        <td style="padding: 8px 0; color: #1e3a5f; text-align: right; border-top: 1px solid #e5e7eb;">📍 ${car.location}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb;">Pickup</td>
                        <td style="padding: 8px 0; color: #1e3a5f; text-align: right; border-top: 1px solid #e5e7eb;">📅 ${pickup}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb;">Return</td>
                        <td style="padding: 8px 0; color: #1e3a5f; text-align: right; border-top: 1px solid #e5e7eb;">📅 ${returnD}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; color: #059669; font-size: 18px; font-weight: 700; border-top: 2px solid #059669;">Total Price</td>
                        <td style="padding: 12px 0; color: #059669; font-size: 18px; font-weight: 700; text-align: right; border-top: 2px solid #059669;">₹${price}</td>
                    </tr>
                </table>
            </div>
            <p style="color: #6b7280; font-size: 14px;">You can view all your bookings in the "My Bookings" section of the app.</p>
        </div>
        <div style="background: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} CarRental. All rights reserved.</p>
        </div>
    </div>`;

    await sendMail(to, `Booking Confirmed - ${car.brand} ${car.model} 🚗`, html);
};

export default transporter;
