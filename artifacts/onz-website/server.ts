import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.zoho.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "onz_1_0@zohomail.com",
    pass: process.env.SMTP_PASS || "NUzqrGeXGVNY",
  },
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, type, message } = req.body;

    if (!name || !email || !type || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    await transporter.sendMail({
      from: process.env.FROM_EMAIL || "onz_1_0@zohomail.com",
      to: "onz_1_0@zohomail.com",
      subject: `[${type.toUpperCase()}] New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nProject Type: ${type}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
