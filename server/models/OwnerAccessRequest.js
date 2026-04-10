import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const ownerAccessRequestSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

ownerAccessRequestSchema.index({ email: 1, status: 1 });

const OwnerAccessRequest = mongoose.model("OwnerAccessRequest", ownerAccessRequestSchema);

export default OwnerAccessRequest;
