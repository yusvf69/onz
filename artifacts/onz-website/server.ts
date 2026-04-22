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
  const isMarkdown = accept.includes("text/markdown") || accept.includes("application/markdown");
  const isLinkset = accept.includes("application/linkset+json");

  if (isMarkdown) {
    res.setHeader("Content-Type", "text/markdown; charset=utf-8");
    res.setHeader("Accept-Post", "text/markdown");
  } else if (isLinkset) {
    res.setHeader("Content-Type", "application/linkset+json");
  } else {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
  }

  res.setHeader("Link", [
    `<${BASE_URL}/.well-known/api-catalog>; rel="service-desc"`,
    `<${BASE_URL}/.well-known/linkset>; rel="linkset"`,
    `<${BASE_URL}/.well-known/openid-configuration>; rel="oauth-authorization-server"`,
    `<${BASE_URL}/.well-known/oauth-protected-resource>; rel="protected-resource"`,
    `<${BASE_URL}/openapi.yaml>; rel="service-desc"`,
    `<${BASE_URL}/docs>; rel="service-doc"`,
    `<${BASE_URL}/.well-known/mcp/server-card.json>; rel="http://modelcontext.org/protocol/mcp-server"`,
    `<${BASE_URL}/.well-known/agent-skills/index.json>; rel="https://agentskills.io/skill"`,
    `<${BASE_URL}/api/health>; rel="status"`,
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

app.get("/.well-known/api-catalog", (req, res) => {
  res.setHeader("Content-Type", "application/linkset+json");
  res.setHeader("Link", `<${BASE_URL}/.well-known/api-catalog>; rel="self"`);
  res.json({
    linkset: [
      {
        anchor: `${BASE_URL}/api`,
        links: [
          {
            rel: "service-desc",
            href: `${BASE_URL}/openapi.yaml`,
            type: "application/yaml",
            title: "OpenAPI 3.0 Specification",
          },
          {
            rel: "service-doc",
            href: `${BASE_URL}/docs`,
            title: "API Documentation",
          },
          {
            rel: "status",
            href: `${BASE_URL}/api/health`,
            title: "Health Check Endpoint",
          },
        ],
      },
    ],
  });
});

app.get("/.well-known/linkset", (req, res) => {
  res.setHeader("Content-Type", "application/linkset+json");
  res.json({
    linkset: [
      {
        anchor: `${BASE_URL}`,
        links: [
          { rel: "service-desc", href: `${BASE_URL}/openapi.yaml` },
          { rel: "service-doc", href: `${BASE_URL}/docs` },
          { rel: "linkset", href: `${BASE_URL}/.well-known/api-catalog` },
          { rel: "https://agentskills.io/skill", href: `${BASE_URL}/.well-known/agent-skills/index.json` },
          { rel: "http://modelcontext.org/protocol/mcp-server", href: `${BASE_URL}/.well-known/mcp-server` },
        ],
      },
    ],
  });
});

app.get("/.well-known/oauth-protected-resource", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({
    resource: "https://digitalpersona.ai",
    authorization_servers: [`${BASE_URL}/.well-known/openid-configuration`],
    scopes_supported: ["read", "write"],
    resource_signing_alg_values_supported: ["RS256"],
  });
});

app.get("/.well-known/openid-configuration", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({
    issuer: BASE_URL,
    authorization_endpoint: `${BASE_URL}/oauth/authorize`,
    token_endpoint: `${BASE_URL}/oauth/token`,
    jwks_uri: `${BASE_URL}/.well-known/jwks.json`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "client_credentials"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    scopes_supported: ["openid", "profile", "email"],
    token_endpoint_auth_methods_supported: ["client_secret_post", "none"],
  });
});

app.get("/.well-known/mcp-server", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({
    schema_version: "v1",
    serverInfo: {
      name: "Digital Persona Core",
      version: "1.0.0",
      description: "Professional digital agency and web development services",
    },
    capabilities: {
      tools: [],
      resources: [
        {
          name: "website_content",
          description: "Information about services, portfolio, and company",
        },
      ],
      prompts: [
        {
          name: "contact_form",
          description: "Help users fill out the contact form",
        },
        {
          name: "service_inquiry",
          description: "Guide users to select the right service",
        },
      ],
    },
    transport: {
      type: "http",
      url: `${BASE_URL}/api/mcp`,
    },
  });
});

app.get("/.well-known/agent-skills/index.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({
    $schema: "https://agentskills.io/agent-skills/v0.2.0.json",
    skills: [
      {
        name: "contact_dpa",
        type: "prompt",
        description: "Interactive guide to help users fill out contact form and select services",
        url: `${BASE_URL}/contact`,
      },
      {
        name: "service_catalog",
        type: "resource",
        description: "List of available web development and AI services",
        url: `${BASE_URL}/services`,
      },
      {
        name: "portfolio_browser",
        type: "resource",
        description: "Portfolio of completed projects and case studies",
        url: `${BASE_URL}/portfolio`,
      },
      {
        name: "founder_connect",
        type: "prompt",
        description: "Connect with the founder for consultation",
        url: `${BASE_URL}/founder`,
      },
    ],
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
