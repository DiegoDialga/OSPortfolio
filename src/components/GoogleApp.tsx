
import React from "react";
import Draggable from "@/components/utils/draggable";


export default function GoogleApp({title, onClose, onMinimize, maximized, minimized, onMaximize, onRestoreMaximized}) {

    return(
        <Draggable>
            <div
                className={`
         ${maximized ? `fixed top-0 left-0 w-screen h-[calc(100vh-50px)] overflow-hidden rounded-none` : 'absolute w-[750px] h-[500px] transition-all'}
               ${minimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100 transition-all'}
         rounded-[10px] backdrop-blur-md text-white border border-gray-600`}>
                {/*<Draggable handle=".titleBar">*/}
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

                <EmbeddedSite />


                {/*</Draggable>*/}
            </div>
        </Draggable>
    )
}
const EmbeddedSite = () => {
    return (
        <div className="bg-white w-full h-full">
            <iframe
                src="https://cheerful-medovik-8565b1.netlify.app/"
                width="100%"
                height="100%"
                style={{ border: "none" }}
            ></iframe>
        </div>
    );
};

