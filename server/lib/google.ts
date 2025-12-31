import { storage } from "../storage";
import { type InsertSearch } from "@shared/schema";
import axios from "axios";

// Mock implementation if keys are missing
export async function performSearch(searchId: number, params: InsertSearch) {
  console.log(`Starting search ${searchId} for ${params.category} in ${params.region}`);
  
  try {
    // Update status to processing
    await storage.updateSearch(searchId, { status: "processing" });

    if (!process.env.GOOGLE_MAPS_API_KEY) {
      console.warn("Missing GOOGLE_MAPS_API_KEY, using mock data");
      await mockSearch(searchId, params);
      return;
    }

    // TODO: Implement real Google Places API logic here
    // For now, let's stick to mock to ensure the app works without keys immediately
    await mockSearch(searchId, params);

  } catch (error) {
    console.error("Search failed:", error);
    await storage.updateSearch(searchId, { status: "failed" });
  }
}

async function mockSearch(searchId: number, params: InsertSearch) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const mockLeads = Array.from({ length: params.limit }).map((_, i) => ({
    searchId,
    name: `${params.category} Example ${i + 1}`,
    category: params.category,
    address: `123 Main St, ${params.region}`,
    city: params.region,
    phone: `(11) 99999-000${i}`,
    whatsapp: `551199999000${i}`,
    rating: 4.5,
    reviewCount: 10 + i,
    googleMapsLink: "https://maps.google.com",
    latitude: -23.550520,
    longitude: -46.633308,
  }));

  for (const lead of mockLeads) {
    await storage.createLead(lead);
  }

  await storage.updateSearch(searchId, { 
    status: "completed", 
    totalLeads: mockLeads.length 
  });
}

export async function exportToSheets(searchId: number) {
  console.log(`Exporting search ${searchId} to Sheets`);
  // Placeholder for Sheets export
  // Would require Google Sheets API setup
  if (!process.env.GOOGLE_SHEETS_CREDENTIALS) {
     throw new Error("Google Sheets credentials not configured");
  }
  
  // Real implementation would go here
  return true;
}
