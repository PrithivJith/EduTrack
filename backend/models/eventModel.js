import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true // This adds createdAt and updatedAt fields
    }
);

export const Event = mongoose.model("Event", eventSchema);
