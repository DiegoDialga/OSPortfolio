"use client";
import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Draggable from "../utils/draggable";
import {
    VscFiles,
    VscSearch,
    VscExtensions,
    VscSettingsGear,
    VscAccount,
    VscRunCoverage
} from "react-icons/vsc";
import { AiOutlineJavaScript } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import WindowsTerminal from "@/components/terminals/WindowsTerminal";
import {useEditor} from "@/context/EditorContext";
import {BACKEND_URI} from "@/components/utils/URL";


export default function VSCodeEditorApp({title, onClose, onMinimize, maximized, minimized, onMaximize, onRestoreMaximized}) {

    const {code, setCode} = useEditor();


    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isTerminalOpen, setIsTerminalOpen] = useState(true);

   const files = ["index.js"]
    const [activeFile, setActiveFile] = useState("index.js");

    useEffect(() => {
        const saved = localStorage.getItem("vscode_editor_code");
        if (saved) setCode(saved);
    }, [setCode]);

    const handleChange = (v) => {
        console.log(v)
        setCode(v);
        localStorage.setItem("vscode_editor_code", v);
    };

    const runCode = async () => {
        console.log(code)
        const res = await fetch(`${BACKEND_URI}/node-runner/run`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        });
        const data = await res.json();
        console.log(data)

    };

    return (
        <Draggable handle=".titleBar">
            <div
                className={`
         ${maximized ? `fixed top-0 left-0 w-screen h-[calc(100vh-50px)] overflow-hidden rounded-none` : 'absolute w-[750px] h-[500px] transition-all'}
               ${minimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100 transition-all'} rounded-[10px] backdrop-blur-md text-white border border-gray-600`}>
                {/*<Draggable handle=".titleBar">*/}
                <div
                    className={`titleBar h-[40px] flex justify-between items-center 
                bg-[#252526]  text-white 
                rounded-t-[11px] overflow-auto`}>
                    <span className="pl-3">{title}</span>
                    <div className="">
                        <button onClick={onMinimize} className="w-[50px] h-full text-white hover:bg-gray-600">➖</button>
                        {maximized ? (
                            <button onClick={onRestoreMaximized} className="w-[50px] h-full hover:bg-gray-600 px-2">🗗</button>
                        ): (
                            <button onClick={onMaximize} className="w-[50px] h-full hover:bg-gray-600 px-2">🗖</button>
                        )}
                        <button onClick={onClose} className="w-[50px] h-full text-white hover:bg-red-600">✕</button>
                    </div>
                </div>

                <div className="flex flex-1  h-full">

                    {/* LEFT MOST ACTIVITY BAR */}
                    <div className="w-[50px] bg-[#202020] flex flex-col items-center py-3 gap-4 text-xl">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hover:scale-110 transition">
                            <VscFiles />
                        </button>
                        <VscSearch className="opacity-50 hover:opacity-100 cursor-pointer" />
                        <VscExtensions className="opacity-50 hover:opacity-100 cursor-pointer" />
                        <div className="flex flex-col mt-auto gap-4">
                            <VscAccount className="opacity-50 hover:opacity-100 cursor-pointer" />
                            <VscSettingsGear className="opacity-50 hover:opacity-100 cursor-pointer" />
                        </div>
                    </div>

                    {/* FILE SIDEBAR */}
                    {isSidebarOpen && (
                        <div className="w-[300px] bg-[#252526] border-r border-gray-800 p-3">
                            <span className="text-xs opacity-70">EXPLORER</span>
                            <div className="mt-2 flex flex-col gap-1 text-xs">
                                {files.map((file) => (
                                    <div
                                        key={file}
                                        onClick={() => setActiveFile(file)}
                                        className={`cursor-pointer px-2 py-1 rounded hover:bg-[#333] ${
                                            activeFile === file ? "bg-[#333]" : ""
                                        }`}
                                    >
                                        {file}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* MAIN EDITOR PANEL */}
                    <div className={`flex flex-col h-full ${isSidebarOpen ? "w-[calc(100%-220px)]" : "w-full"}`}>


                    {/* Tab Bar */}
                        <div className="flex justify-between items-center bg-[#2d2d2d] h-[30px]">
                            <span className={'bg-[#252526] flex flex-row h-full justify-center items-center px-2'}>
                            <AiOutlineJavaScript size={'14px'} />
                            <span className=" flex justify-center items-center ml-2 text-xs h-full">{activeFile}</span>
                                </span>
                            <VscRunCoverage size={20} color={'white'} onClick={runCode} className={'white px-3 py-1 cursor-pointer hover:scale-110 transition'} />
                        </div>

                        <div className={`${isTerminalOpen ? "flex-grow" : "h-full"} transition-all`}>
                            <Editor
                                theme="vs-dark"
                                defaultLanguage="javascript"
                                value={code}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Terminal bottom */}
                        { (
                            <div className="bg-[#202020] flex-shrink-0 h-[35%] py-1 px-3 text-white font-mono text-xs border-t border-gray-700 overflow-hidden">

                            <div className={"flex justify-between items-center"}>
                                    <div className={'flex flex-row justify-between w-[220px]'}>
                                        <span>PROBLEMS</span>
                                        <span>OUTPUT</span>

                                        <span>TERMINAL</span>
                                        <button onClick={()=> setIsTerminalOpen(false)}>close</button>
                                    </div>

                                    <div>
                                        <IoClose size={20} />
                                    </div>

                                </div>
                                <WindowsTerminal terminalType={'VSTerminal'} onClose={onClose}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Draggable>
    );
}
