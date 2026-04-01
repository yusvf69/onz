import type { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../src/app";
import type { Request, Response } from "express";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await new Promise<void>((resolve, reject) => {
    app(req as Request, res as unknown as Response, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
