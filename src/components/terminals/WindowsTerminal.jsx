
import { useEffect, useRef, useState} from "react";
import {windowCommands} from "@/components/terminals/commands/windowCommands";
import {fontColors} from "@/components/terminals/fontColors";
import {getLocalStorage, setLocalStorage} from "@/components/utils/localStorage";
import {backgroundTheme, terminalTheme} from "@/components/terminals/terminalTheme";



const WindowsTerminal = ({background, onClose}) => {
    const path = "C:\\Users\\Doflamingo";
    const [output, setOutput] = useState([""]);
    const [input, setInput] = useState("");
    const terminalEndRef = useRef(null);
    const inputFocusRef = useRef(null);
    const [fontColor, setFontColor] = useState(fontColors[getLocalStorage('fontColor')]);

    useEffect(()=>{
        console.log("hello")

    }, [output])

    const user = localStorage.getItem("selectedUser").toLowerCase();

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


        if(cmd.toLowerCase() === "description"){

            Object.keys(windowCommands[user]).map((command) => {
                const {description} = windowCommands[user][command];

                newOutput.push(<span key={command}>
                <span className="text-white  font-bold">{command}</span>:{" "}
                    <span style={{color: fontColor}}>{description}</span>
            </span>)
            })

            setOutput(newOutput)
        } else {
            switch (cmd.toLowerCase()) {
                case "help":
                    newOutput.push(windowCommands[user].help.output);
                    break;
                case "clear":
                    setOutput([]);
                    return;
                case "aboutme":
                    windowCommands[user].aboutme.output.split('\n').map((line) => (
                        newOutput.push(line)
                    ))
                    break;
                case "echo":
                    newOutput.push(cmdArgs);
                    break;
                case "gmail":
                    newOutput.push(windowCommands[user].gmail.output);
                    //window.open(`https://${windowCommands.gmail.output}`, "_blank");
                    break
                case "portfolio":
                    window.open(`https://${windowCommands[user].portfolio.output}`, "_blank");
                    break
                case "projects":
                    windowCommands[user].projects.output.split('\n').map((line) => (
                        newOutput.push(line)
                    ))
                    break
                case "history":
                    newOutput.push(newOutput.join("\n"));
                    break
                case "socials":
                    windowCommands[user].socials.output.split('\n').map((line) => (
                        newOutput.push(line)
                    ))
                    break
                case "fontcolor":
                    if(cmdArgs.length == 0){
                        const string = "Try: 'fontcolor available' for listing all colors. \n" +
                            "Try: 'fontcolor <colorname>' to change the font color "
                        string.split('\n').map((line) => (
                            newOutput.push(line)
                        ))
                    }else if(cmdArgs[0] === 'available') {
                        Object.keys(fontColors).map((fontColor) => {
                            newOutput.push(fontColor)
                        })
                    }else{
                        console.log("else called");
                        if(fontColors.hasOwnProperty(cmdArgs[0])){
                            setFontColor(fontColors[cmdArgs[0].split(' ')])
                            setLocalStorage("fontColor", fontColors[cmdArgs[0].split(' ')]);
                        }
                        else {
                            newOutput.push(`${cmdArgs[0]} is not a color available. Please choose a valid color from:`);
                            Object.keys(fontColors).map((fontColor) => {
                                newOutput.push(`-> ${fontColor}`)
                            })
                        }

                    }
                    break
                case "background":
                    if(cmdArgs.length == 0 || cmdArgs[1] == ""){
                        const string = "Try: 'background available' for listing all background colors. \n" +
                            "Try: 'background <colorname> <transparency>' to change the background color. \n " +
                            "Note: <transparency> is optional and should be between 0 and 1."
                        string.split('\n').map((line) => (
                            newOutput.push(line)
                        ))
                    }else if(cmdArgs[0] == 'available'){
                        Object.keys(backgroundTheme).map((theme) => {
                            newOutput.push(theme)
                        })
                    }else{

                        if(backgroundTheme.hasOwnProperty(cmdArgs[0]) && cmdArgs[1] == null){
                            background(terminalTheme(cmdArgs[0], 0.3))
                            setLocalStorage("backgroundTheme", terminalTheme(cmdArgs[0], 0.3))
                            console.log("present")
                        }
                        else if(backgroundTheme.hasOwnProperty(cmdArgs[0]) && cmdArgs[1] != null){
                            if(isNaN(Number(cmdArgs[1]))){
                                newOutput.push(`Invalid command! Please check the command again.`)
                            }else{
                                background(terminalTheme(cmdArgs[0], parseFloat(cmdArgs[1])))
                                setLocalStorage("backgroundTheme", terminalTheme(cmdArgs[0], parseFloat(cmdArgs[1])))
                            }
                        }
                        else{
                            newOutput.push(`${cmdArgs[0]} is not a theme available. Please choose a valid theme from:`);
                            Object.keys(backgroundTheme).map((theme) => {
                                newOutput.push(`-> ${theme}`)
                            })
                        }
                    }
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

    useEffect (() => {
        if(getLocalStorage("fontColor") == null) setLocalStorage("fontColor", "dark-green");
        else setFontColor(getLocalStorage("fontColor"));
        console.log(getLocalStorage("fontColor"));
    }, [])

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [output]);

    return (
        <div
            style={{color: fontColor}}
            className={`w-full h-full font-mono text-[17px] font-extrabold brightness-150`}
            onClick={() => inputFocusRef.current?.focus()}>
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

                <div ref={terminalEndRef}/>


                {/* Input Area */}
                <div className="h-2" />
                <div className="flex">
                    <span>{path}&gt;</span>
                    <input
                        type="text"
                        value={input}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent outline-none flex-1 ml-2"
                        autoFocus
                        spellCheck={false}
                        ref={inputFocusRef}
                    />
                </div>
                <br/>
            </div>
        </div>
    );
};

export default WindowsTerminal;
