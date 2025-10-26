export const dynamic = "force-dynamic";


import mongoose from "mongoose";

const SuggestionSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Suggestion || mongoose.model("Suggestion", SuggestionSchema);