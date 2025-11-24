
export const dynamic = "force-dynamic";
import { connectToDatabase} from "../../../lib/mongo";
import Suggestion from "@/models/SuggestionModel";

export async function POST(req) {
    try {
        console.log("📩 Incoming POST request");

        await connectToDatabase();
        console.log("✅ Connected to database");

        const body = await req.json();
        console.log("🧾 Request body:", body);

        const { name, email, message } = body;

        if (!name || !email || !message) {
            return Response.json({ success: false, message: "Missing fields" }, { status: 400 });
        }

        const newSuggestion = new Suggestion({ name, email, message });
        await newSuggestion.save();
        console.log("✅ Suggestion saved");

        return Response.json({ success: true });
    } catch (error) {
        console.error("❌ Error in POST /api/suggestions:", error);
        return Response.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}


export async function GET() {
    try {
        await connectToDatabase();
        const suggestions = await Suggestion.find().sort({ createdAt: -1 });
        return Response.json({ success: true, suggestions });
    } catch (e) {
        return Response.json({ success: false, message: "Error fetching suggestions"  + e}, { status: 500 });
    }
}
