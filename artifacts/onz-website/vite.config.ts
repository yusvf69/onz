import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT;

const port = rawPort ? Number(rawPort) : 5173;
if (rawPort && (Number.isNaN(port) || port <= 0)) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";
const BASE_URL = process.env.BASE_URL || "https://digitalpersona.ai";

function linkHeadersPlugin(): Plugin {
  return {
    name: "link-headers",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const accept = req.headers.accept || "";
        if (accept.includes("text/markdown")) {
          res.setHeader("Content-Type", "text/markdown; charset=utf-8");
        }
        res.setHeader("Link", [
          `<${BASE_URL}/.well-known/api-catalog>; rel="service-desc"`,
          `<${BASE_URL}/.well-known/linkset>; rel="linkset"`,
          `<${BASE_URL}/.well-known/openid-configuration>; rel="urn:ietf:params:oauth:grant-type:recovery-codes"`,
          `<${BASE_URL}/.well-known/oauth-protected-resource>; rel="protected-resource"`,
          `<${BASE_URL}/openapi.yaml>; rel="service-desc"`,
          `<${BASE_URL}/docs>; rel="service-doc"`,
          `<${BASE_URL}/.well-known/mcp/server-card.json>; rel="http://modelcontext.org/protocol/mcp-server"`,
          `<${BASE_URL}/.well-known/agent-skills/index.json>; rel="https://agentskills.io/skill"`,
          `<${BASE_URL}/api/health>; rel="status"`,
        ].join(", "));
        next();
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    linkHeadersPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(
        import.meta.dirname,
        "..",
        "..",
        "attached_assets",
      ),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
