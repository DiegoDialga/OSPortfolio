"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import Draggable from "../utils/draggable";

export default function VSCodeEditorApp({
  title = "VS Code",
  onClose,
  onMaximize,
  onMinimize,
  maximized,
  minimized,
  onRestoreMaximized,
}) {
  const [code, setCode] = useState(
`function greet() {
  console.log("Hello from your OS Portfolio!");
}`
  );

  return (
    <Draggable handle=".titleBar">
    <div
      className={`
        ${maximized
          ? "fixed top-0 left-0 w-screen h-[calc(100vh-50px)] rounded-none"
          : "absolute w-[900px] h-[600px]"}
        ${minimized ? "scale-0 opacity-0" : "scale-100 opacity-100"}
        rounded-[10px]
        border border-gray-600
        bg-[#1e1e1e]
        overflow-hidden
        transition-all
      `}
    >
      {/* TITLE BAR */}
      <div
                    className={`titleBar h-[40px] flex justify-between items-center 
                bg-black/40 backdrop-blur-md text-white 
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

      {/* FAKE TAB BAR (VSCode style) */}
      <div className="flex items-center gap-4 bg-[#252526] px-4 py-2 text-xs border-b border-black text-white">
        <div className="flex items-center gap-2 bg-[#1e1e1e] px-3 py-1 rounded-t">
          <span>index.js</span>
        </div>
      </div>

      {/* MONACO EDITOR */}
      <div className="w-full h-[calc(100%-80px)]">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            smoothScrolling: true,
            automaticLayout: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
    </Draggable>
  );
}
