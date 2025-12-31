import { pgTable, text, serial, integer, doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const searches = pgTable("searches", {
  id: serial("id").primaryKey(),
  region: text("region").notNull(),
  category: text("category").notNull(),
  radius: integer("radius").notNull().default(5000), // in meters
  limit: integer("limit").notNull().default(10),
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  totalLeads: integer("total_leads").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  searchId: integer("search_id").notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  phone: text("phone"),
  whatsapp: text("whatsapp"),
  rating: doublePrecision("rating"),
  reviewCount: integer("review_count"),
  googleMapsLink: text("google_maps_link"),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  collectedAt: timestamp("collected_at").defaultNow(),
});

export const insertSearchSchema = createInsertSchema(searches).omit({ 
  id: true, 
  createdAt: true, 
  status: true, 
  totalLeads: true 
});

export const insertLeadSchema = createInsertSchema(leads).omit({ 
  id: true, 
  collectedAt: true 
});

export type Search = typeof searches.$inferSelect;
export type InsertSearch = z.infer<typeof insertSearchSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
