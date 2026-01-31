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
    witnesses: {
      type: [String],
      required: true,
    },
    evidenceLink: { type: String },
    // NEW FIELDS FOR IMAGES
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