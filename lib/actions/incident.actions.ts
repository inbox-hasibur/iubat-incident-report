"use server";

import connectToDatabase from "../db";
import Incident from "../models/Incident";
import { revalidatePath } from "next/cache";

export async function createIncident(formData: FormData) {
  try {
    await connectToDatabase();

    // Multiple Links handle kora
    // Form theke amra "evidenceLinks" name-e string pabo (comma separated thakte pare)
    const linksString = formData.get("evidenceLinks") as string;
    const evidenceLinks = linksString 
      ? linksString.split(",").map((link) => link.trim()).filter((link) => link.length > 0)
      : [];

    const rawData = {
      title: formData.get("title"),
      type: formData.get("type"),
      description: formData.get("description"),
      date: formData.get("date"),
      time: formData.get("time"),
      location: formData.get("location"),
      reportedPerson: formData.get("reportedPerson"),
      
      // Witnesses
      witnesses: [formData.get("witness1"), formData.get("witness2")],
      
      // New: Multiple Links
      evidenceLinks: evidenceLinks,

      // New: Images (URLs from Cloudinary)
      victimImage: formData.get("victimImage"),
      itemImage: formData.get("itemImage"),
      accusedImage: formData.get("accusedImage"),
    };

    const newIncident = await Incident.create(rawData);

    revalidatePath("/");
    
    return { success: true, message: "Red Flag filed successfully!" };
  } catch (error: any) {
    console.error("Database Error:", error);
    return { success: false, message: error.message || "Failed to submit report" };
  }
}