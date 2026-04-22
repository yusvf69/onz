import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const BASE_URL = process.env.BASE_URL || "https://digitalpersona.ai";

app.use((req, res, next) => {
  const accept = req.headers.accept || "";

  if (accept.includes("text/markdown") || accept.includes("application/markdown")) {
    res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  } else {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
  }

  res.setHeader("Link", [
    `<${BASE_URL}/.well-known/ai-plugin.json>; rel="ai-plugin"`,
    `<${BASE_URL}/.well-known/api-catalog.json>; rel="api-catalog"`,
    `<${BASE_URL}/docs>; rel="documentation"`,
    `<${BASE_URL}/openapi.yaml>; rel="api-schema"`,
    `<${BASE_URL}/.well-known/mcp-server>; rel="mcp-server"`,
  ].join(", "));

  next();
});

app.get("/.well-known/ai-plugin.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({
    schema_version: "v1",
    name_for_model: "Digital Persona Core",
    name_for_human: "Digital Persona Core",
    description_for_model: "Digital Persona Core - Professional website and services. Provides information about web development, AI solutions, digital transformation services, and founder consultation.",
    description_for_human: "Professional digital agency specializing in web development and AI solutions.",
    logo_url: "https://digitalpersona.ai/opengraph.jpg",
    contact_email: "onz@digitalpersona.ai",
    legal_info_url: "https://digitalpersona.ai/legal",
  });
});

app.get("/.well-known/api-catalog.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({
    "api-version": "1.0",
    info: {
      title: "Digital Persona Core API",
      description: "API for contact form submissions and service inquiries",
      contact: {
        name: "Digital Persona Core",
        email: "onz@digitalpersona.ai",
      },
    },
    endpoints: [
      {
        path: "/api/contact",
        methods: ["POST"],
        summary: "Submit contact form",
        description: "Send a contact form submission via email",
      },
      {
        path: "/api/health",
        methods: ["GET"],
        summary: "Health check",
        description: "Check API health status",
      },
    ],
    documentation: "https://digitalpersona.ai/docs",
  });
});

app.get("/.well-known/mcp-server", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({
    name: "Digital Persona Core",
    version: "1.0.0",
    description: "Professional digital agency and web development services",
    capabilities: {
      tools: [],
      resources: ["website_content", "services", "portfolio"],
      prompts: ["contact_form", "service_inquiry"],
    },
    endpoints: {
      api: `${BASE_URL}/api`,
      health: `${BASE_URL}/api/health`,
    },
    contact: {
      email: "onz@digitalpersona.ai",
      website: "https://digitalpersona.ai",
    },
  });
});

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
