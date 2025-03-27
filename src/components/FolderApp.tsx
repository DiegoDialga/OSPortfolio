
import React from "react";
import Draggable from "@/components/utils/draggable";


export default function FolderApp({title, onClose, onMinimize, maximized, minimized, onMaximize, onRestoreMaximized}) {

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
         ${maximized ? `fixed top-0 left-0 w-screen h-[calc(100vh-50px)] rounded-none` : 'absolute w-[750px] h-[500px] transition-all'}
               ${minimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100 transition-all'}
         rounded-[10px] backdrop-blur-md text-white border border-gray-600`}>
                {/*<Draggable handle=".titleBar">*/}
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


                {/*</Draggable>*/}
            </div>
        </Draggable>
    )
}