import mongoose, { Schema, model, models } from "mongoose";

const ReactionSchema = new Schema(
  {
    incidentId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Incident", 
      required: true 
    },
    ip: { type: String, required: true },
    type: { 
      type: String, 
      enum: ["justice", "agree", "haha", "angry", "sad", "support"], 
      required: true 
    },
  },
  { timestamps: true }
);

ReactionSchema.index({ incidentId: 1, ip: 1 }, { unique: true });

const Reaction = models.Reaction || model("Reaction", ReactionSchema);

export default Reaction;