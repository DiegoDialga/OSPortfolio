import { useState, useEffect, useRef } from "react";

const TerminalApp = ({ title, onClose, onMinimize, maximized }) => {
    const [output, setOutput] = useState(["Welcome to the terminal!", "Type 'help' to get started"]);
    const [input, setInput] = useState("");
    const terminalEndRef = useRef(null);

    const handleInput = (e) => setInput(e.target.value);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            processCommand(input);
            setInput("");
        }
    };

    const processCommand = (command) => {
        const newOutput = [...output, `> ${command}`];

        switch (command.toLowerCase()) {
            case "help":
                newOutput.push("Available commands: help, clear, about");
                break;
            case "clear":
                setOutput([]);
                return;
            case "about":
                newOutput.push("This is a custom terminal built with React and Tailwind!");
                break;
            default:
                newOutput.push(`Unknown command: ${command}`);
        }

        setOutput(newOutput);
    };

    // Auto-scroll to bottom when output updates
    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [output]);

    return (
        <div
            className={`absolute bg-black text-green-400 font-mono border border-gray-600 ${
                maximized ? "w-screen h-[calc(100vh-70px)] top-0 left-0 rounded-none" : "w-[600px] h-[400px]"
            }`}
        >
            <div className="flex justify-between bg-black/40 p-2 text-white">
                <span>{title}</span>
                <div>
                    <button onClick={onMinimize} className="px-2 hover:bg-gray-600">➖</button>
                    <button onClick={onClose} className="px-2 hover:bg-red-600">✕</button>
                </div>
            </div>

            <div className="h-[calc(100%-40px)] overflow-y-auto p-2">
                {output.map((line, index) => (
                    <p key={index} className="break-words">{line}</p>
                ))}
                <div ref={terminalEndRef} />
            </div>

            <div className="flex">
                <span className="text-green-400">C:\Users\You&gt;</span>
                <input
                    type="text"
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent text-green-400 outline-none flex-1 ml-2"
                    autoFocus
                />
            </div>
        </div>
    );
};

export default TerminalApp;
