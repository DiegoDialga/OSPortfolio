"use client"
import React, {useEffect, useState} from "react";
import Draggable from "../utils/draggable";
import Window from "../utils/window";


export default function SuggestionApp({title, onClose, onMinimize, maximized, minimized, onMaximize, onRestoreMaximized}) {

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

    const handleMouseEnter = () =>{
        console.log("mouseenter");
    } ;
    const handleMouseLeave = () =>{
        console.log("mouseleft");
    } ;

    return(
        <Draggable>
            <div
                className={`
         ${maximized ? ` fixed top-0 left-0 w-screen h-[calc(100vh-50px)] rounded-none` : 'absolute w-[750px] h-[500px] transition-all'}
               ${minimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100 transition-all cursor-default'}
         rounded-[10px] backdrop-blur-md text-white border border-gray-600`}>
                {/*<Draggable handle=".titleBar">*/}
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`titleBar h-[40px] flex justify-between items-center 
                bg-black/70 text-white 
                rounded-t-[11px] overflow-hidden`}>
                    <span className="pl-3">{title}</span>
                    <div className="h-full">
                        <button onClick={onMinimize} className="w-[50px] h-full text-white hover:bg-gray-600">➖</button>
                        {maximized ? (
                            <button onClick={onRestoreMaximized} className="w-[50px] h-full hover:bg-gray-600 px-2">🗗</button>
                        ): (
                            <button onClick={onMaximize} className="w-[50px] h-full hover:bg-gray-600 px-2">🗖</button>
                        )}
                        <button onClick={onClose} className="w-[50px] h-full text-white hover:bg-red-600">✕</button>
                    </div>
                </div>
                <div className={"bg-black/90 w-full h-full"}>
                    <Window>
                        <div>
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
                        </div>
                    </Window>
                </div>



                {/*</Draggable>*/}
            </div>
        </Draggable>
    )
}