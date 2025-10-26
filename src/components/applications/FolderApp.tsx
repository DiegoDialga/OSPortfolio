
import React from "react";
import Draggable from "../utils/draggable";
import PDFViewer from "../utils/PDFViewer";
import Window from "../utils/window";
import Image from "next/image";
import {getUserFromStorage} from "@/localStorage";


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
                    <div className="flex flex-col items-center justify-center hover:bg-gray-500 p-3 rounded" onClick={() => {
                        if (getUserFromStorage() == 'Deepanshu'){
                            PDFViewer('/pdf/deepanshu/resume.pdf')
                        }else{
                        PDFViewer('/pdf/jigyasa/resume.pdf')}
                    }
                    }
                       >
                    <Image className="mb-1" src={'/images/pdf-icon.webp'} width={50} height={50} alt={"pdf"} />
                    <p>Resume</p>
                    </div>
                </Window>
                </div>



                {/*</Draggable>*/}
            </div>
        </Draggable>
    )
}