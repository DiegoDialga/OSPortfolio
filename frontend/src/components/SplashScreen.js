"use client";
import { useEffect, useState } from "react";

export default function SplashScreen() {
    const [loading, setLoading] = useState(true);


    const handleLogin = (user) => {
        localStorage.setItem("selectedUser", user);
        window.location.href = "/desktop";
    };

    useEffect(() => {
        // simulate boot/loading screen for 2s
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-sky-900 to-blue-800 text-white">
            <h1 className="text-3xl mb-8">Welcome</h1>
            <div className="flex gap-8">
                {["Deepanshu", "Jigyasa"].map((user) => (
                    <button
                        key={user}
                        onClick={() => handleLogin(user)}
                        className="flex flex-col items-center p-6 rounded-2xl bg-white/10 hover:bg-white/20 transition"
                    >
                        <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center text-black font-bold text-xl">
                            {user[0]}
                        </div>
                        <span className="mt-4">{user}</span>
                    </button>
                ))}
            </div>
        </div>
    );
} 