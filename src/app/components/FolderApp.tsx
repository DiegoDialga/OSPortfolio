import React, {useState} from "react";
import Draggable from "react-draggable";


export default function FolderApp({title, onClose, onMinimize, maximized, minimized, onMaximize, onRestoreMaximized}) {
    const [cursorAtFolderTitleBar, setCursorAtFolderTitleBar] = useState(false);

    const handleMouseEnter = () => {
        setCursorAtFolderTitleBar(true)
        console.log("mouseenter");
    };
    const handleMouseLeave = () => {
        setCursorAtFolderTitleBar(false)
        console.log("mouseleft");
    };

    return (
        <Draggable disabled={!cursorAtFolderTitleBar}>
            <div className={`
        ${maximized ? `w-screen h-[calc(100vh-70px}] top-0 left-0 rounded-none` : 'w-[750px] h-[500px]'}
        ${minimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
        w-[1440px] h-[720px] absolute rounded-[10px] bg-black/30 backdrop-blur-md text-white border border-gray-600`}>
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
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

            </div>
        </Draggable>
    )
}