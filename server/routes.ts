import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { performSearch, exportToSheets } from "./lib/google";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.post(api.searches.create.path, async (req, res) => {
    try {
      const input = api.searches.create.input.parse(req.body);
      const search = await storage.createSearch(input);
      
      // Start search in background
      performSearch(search.id, input).catch(err => console.error("Search failed:", err));

      res.status(201).json(search);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
        return;
      }
      throw err;
    }
  });

  app.get(api.searches.list.path, async (req, res) => {
    const searches = await storage.getSearches();
    res.json(searches);
  });
  
  app.get(api.searches.get.path, async (req, res) => {
     const search = await storage.getSearch(Number(req.params.id));
     if (!search) return res.status(404).json({ message: "Search not found" });
     res.json(search);
  });

  app.get(api.leads.list.path, async (req, res) => {
    const searchId = req.query.searchId ? Number(req.query.searchId) : undefined;
    const leads = await storage.getLeads(searchId);
    res.json(leads);
  });

  app.post(api.leads.export.path, async (req, res) => {
    try {
      const { searchId } = req.body;
      await exportToSheets(searchId);
      res.json({ success: true, message: "Exported successfully" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  // Seed data if empty
  if (process.env.NODE_ENV !== "production") {
    const existingSearches = await storage.getSearches();
    if (existingSearches.length === 0) {
      console.log("Seeding database with example search...");
      const input = {
        region: "São Paulo",
        category: "Padaria",
        radius: 5000,
        limit: 10
      };
      const search = await storage.createSearch(input);
      performSearch(search.id, input).catch(err => console.error("Seed search failed:", err));
    }
  }

  return httpServer;
}
