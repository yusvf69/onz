import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  try {
    console.log("Received body:", JSON.stringify(req.body));
    console.log("Content-Type:", req.headers["content-type"]);

    const { name, email, type, message } = req.body;

    if (!name || !email || !type || !message) {
      console.log("Validation failed - missing fields");
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: "Invalid email format" });
      return;
    }

    const projectTypes: Record<string, string> = {
      web: "Web Platform",
      mobile: "Mobile App",
      ai: "AI Integration",
      other: "Other",
    };

    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      console.log("Sending email with Zoho SMTP...");

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: process.env.FROM_EMAIL,
        subject: `New Project Inquiry - ${projectTypes[type] || type}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Type:</strong> ${projectTypes[type] || type}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
        replyTo: email,
      });

      console.log("Email sent successfully!");
    } else {
      console.log(
        "SMTP not configured, skipping email. Contact form submission:",
        { name, email, type, message },
      );
    }

    res
      .status(200)
      .json({ success: true, message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    res
      .status(500)
      .json({ error: "Failed to send message. Please try again later." });
  }
});

export default router;
