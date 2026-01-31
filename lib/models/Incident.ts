import mongoose, { Schema, model, models } from "mongoose";

const IncidentSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { 
      type: String, 
      required: true, 
      enum: ["theft", "scam", "harassment", "other"] 
    },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    reportedPerson: { type: String },
    
    // Witnesses
    witnesses: {
      type: [String],
      required: true,
    },

    // OLD: evidenceLink: { type: String }
    // NEW: Multiple Links support
    evidenceLinks: { 
      type: [String], 
      default: [] 
    },

    // CLOUDINARY IMAGES (Images/PDFs ONLY)
    victimImage: { type: String },
    itemImage: { type: String },
    accusedImage: { type: String },

    status: {
      type: String,
      default: "unverified",
      enum: ["unverified", "verified", "under-review", "resolved"],
    },
  },
  { timestamps: true }
);

const Incident = models.Incident || model("Incident", IncidentSchema);

export default Incident;