import { useEffect, useRef, useState } from "react";
import { windowCommands } from "@/app/components/terminals/commands/windowCommands";


const WindowsTerminal = ({onClose}) => {
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
        const newOutput: (string | JSX.Element)[] = [...output, `${path}> ${command}`];

        const [cmd, ...cmdArgs] = command.toLowerCase().split(" ");
        console.log(cmd)
        console.log(cmdArgs)


        if(cmd.toLowerCase() == "description"){

            Object.keys(windowCommands).map((command) => {
                const {description} = windowCommands[command];

                newOutput.push(<span key={command}>
                <span className="text-white  font-bold">{command}</span>:{" "}
                    <span className="text-green-600">{description}</span>
            </span>)
            })


            setOutput(newOutput)
        } else {
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
                    break;
                case "echo":
                    newOutput.push(cmdArgs);
                    break;
                case "gmail":
                    newOutput.push(windowCommands.gmail.output);
                    //window.open(`https://${windowCommands.gmail.output}`, "_blank");
                    break
                case "portfolio":
                    window.open(`https://${windowCommands.portfolio.output}`, "_blank");
                    break;
                case "history":
                    newOutput.push(newOutput.join("\n"));
                    break
                case "socials":
                    windowCommands.socials.output.split('\n').map((line) => (
                        newOutput.push(line)
                    ))
                    break;
                case "exit":
                    onClose();
                    break;
                default:
                    newOutput.push(`Unknown command: ${command}`);
            }

            setOutput(newOutput);
        }
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
            <span>
                <p>If you don&#39;t know what to do, try &#34;help&#34;</p>
            </span>

            {/* Scrollable Output Area */}
            <div className="h-[calc(100%-120px)] overflow-y-auto p-2">
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
