"use client";
import { useState, useEffect } from "react";

export default function Page() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        fetchSuggestions().then(r => {console.log(r)});
    }, []);

    const fetchSuggestions = async () => {
        const res = await fetch("/api/suggestions");
        const data = await res.json();
        if (data.success) setSuggestions(data.suggestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/suggestions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success) {
            setForm({ name: "", email: "", message: "" });
            fetchSuggestions().then(r => {console.log(r)});
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Leave a Suggestion</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    placeholder="Your Suggestion"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="border p-2 rounded"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Submit
                </button>
            </form>

            <h2 className="text-xl font-semibold mt-6 mb-3">Previous Suggestions</h2>
            <ul className="space-y-2">
                {suggestions.map((sug) => (
                    <li key={sug._id} className="border p-3 rounded bg-gray-100">
                        <p className="font-medium">{sug.name} ({sug.email})</p>
                        <p>{sug.message}</p>
                        <p className="text-sm text-gray-500">{new Date(sug.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
