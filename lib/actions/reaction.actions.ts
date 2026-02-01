"use server";

import { headers } from "next/headers";
import connectToDatabase from "../db";
import Reaction from "../models/Reaction";
import { revalidatePath } from "next/cache";

export async function handleReaction(incidentId: string, type: string) {
  try {
    await connectToDatabase();
    
    // Get user IP from headers
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || "127.0.0.1";

    // Check if reaction already exists
    const existingReaction = await Reaction.findOne({ incidentId, ip });

    if (existingReaction) {
      if (existingReaction.type === type) {
        // If same type, remove it (toggle off)
        await Reaction.findByIdAndDelete(existingReaction._id);
      } else {
        // If different type, update it
        existingReaction.type = type;
        await existingReaction.save();
      }
    } else {
      // Create new reaction
      await Reaction.create({ incidentId, ip, type });
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Reaction Error:", error);
    return { success: false };
  }
}

// Function to get reaction counts for an incident
export async function getReactionCounts(incidentId: string) {
  try {
    await connectToDatabase();
    const reactions = await Reaction.find({ incidentId });
    
    return {
      justice: reactions.filter(r => r.type === "justice").length,
      agree: reactions.filter(r => r.type === "agree").length,
      haha: reactions.filter(r => r.type === "haha").length,
      angry: reactions.filter(r => r.type === "angry").length,
      sad: reactions.filter(r => r.type === "sad").length,
      support: reactions.filter(r => r.type === "support").length,
    };
  } catch (error) {
    return { justice: 0, agree: 0, haha: 0, angry: 0, sad: 0, support: 0 };
  }
}