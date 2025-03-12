import { useEffect, useRef, useState } from "react";
import { windowCommands } from "@/app/components/terminals/commands/windowCommands";
import window from "@/app/components/window";

const WindowsTerminal = () => {
    const path = "C:\\Users\\Doflamingo";
    const [output, setOutput] = useState([""]);
    const [input, setInput] = useState("");
    const terminalEndRef = useRef(null);


    const handleInput = (event) => {
        setInput(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            processCommand(input);
            setInput("");
        }
    };

    const processCommand = (command) => {
        const newOutput = [...output, `${path}> ${command}`];

        const [cmd, ...cmdArgs] = command.toLowerCase().split(" ");
        console.log(cmd)
        console.log(cmdArgs)



        switch (cmd.toLowerCase()) {
            case "help":
                newOutput.push(windowCommands.help.output);
                break;
            case "clear":
                setOutput([]);
                return;
            case "aboutme":
                windowCommands.aboutme.output.split('\n').map((line) => (
                    newOutput.push(line)
                ))
                break
            case "echo":
                newOutput.push(cmdArgs);
                break;


            default:
                newOutput.push(`Unknown command: ${command}`);
        }

        setOutput(newOutput);
    };

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [output]);

    return (
        <div className="w-full h-full font-mono font-medium text-green-600 brightness-150">
            <span>
                <p>Microsoft Windows [Version 10.0.22631.4169]</p>
                <p>(c) Microsoft Corporation. All rights reserved.</p>
            </span>

            {/* Scrollable Output Area */}
            <div className="h-[calc(100%-90px)] overflow-y-auto p-2">
                {output.map((line, index) => (
                    <p key={index} className="break-words">{line}</p>
                ))}
                <div ref={terminalEndRef} />


            {/* Input Area */}
            <div className="flex">
                <span>{path}&gt;</span>
                <input
                    type="text"
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent text-green-400 outline-none flex-1 ml-2"
                    autoFocus
                />
            </div>
                <br/>
            </div>
        </div>
    );
};

export default WindowsTerminal;
