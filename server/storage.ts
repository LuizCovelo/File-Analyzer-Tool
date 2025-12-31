import { searches, leads, type Search, type InsertSearch, type Lead, type InsertLead } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  createSearch(search: InsertSearch): Promise<Search>;
  getSearches(): Promise<Search[]>;
  getSearch(id: number): Promise<Search | undefined>;
  updateSearch(id: number, updates: Partial<Search>): Promise<Search>;
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(searchId?: number): Promise<Lead[]>;
}

export class DatabaseStorage implements IStorage {
  async createSearch(insertSearch: InsertSearch): Promise<Search> {
    const [search] = await db.insert(searches).values(insertSearch).returning();
    return search;
  }

  async getSearches(): Promise<Search[]> {
    return await db.select().from(searches).orderBy(desc(searches.createdAt));
  }

  async getSearch(id: number): Promise<Search | undefined> {
    const [search] = await db.select().from(searches).where(eq(searches.id, id));
    return search;
  }

  async updateSearch(id: number, updates: Partial<Search>): Promise<Search> {
    const [updated] = await db.update(searches).set(updates).where(eq(searches.id, id)).returning();
    return updated;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async getLeads(searchId?: number): Promise<Lead[]> {
    if (searchId) {
      return await db.select().from(leads).where(eq(leads.searchId, searchId));
    }
    return await db.select().from(leads);
  }
}

export const storage = new DatabaseStorage();
