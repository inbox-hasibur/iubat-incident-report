"use server";

import connectToDatabase from "../db";
import Incident from "../models/Incident";
import { revalidatePath } from "next/cache";

export async function createIncident(formData: FormData) {
  try {
    await connectToDatabase();

    // Extract data from the form
    const rawData = {
      title: formData.get("title"),
      type: formData.get("type"),
      description: formData.get("description"),
      date: formData.get("date"),
      time: formData.get("time"),
      location: formData.get("location"),
      reportedPerson: formData.get("reportedPerson"),
      witnesses: [formData.get("witness1"), formData.get("witness2")],
      evidenceLink: formData.get("evidenceLink"),
    };

    // Save to MongoDB
    const newIncident = await Incident.create(rawData);

    // Refresh the page data
    revalidatePath("/");
    
    return { success: true, message: "Report filed successfully!" };
  } catch (error: any) {
    console.error("Database Error:", error);
    return { success: false, message: error.message || "Failed to submit report" };
  }
}