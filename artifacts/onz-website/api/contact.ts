import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, type, message } = req.body;

  if (!name || !email || !type || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const nodemailer = await import("nodemailer");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.zoho.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER || "onz_1_0@zohomail.com",
      pass: process.env.SMTP_PASS || "NUzqrGeXGVNY",
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || "onz_1_0@zohomail.com",
      to: "onz_1_0@zohomail.com",
      subject: `[${type.toUpperCase()}] New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nProject Type: ${type}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
