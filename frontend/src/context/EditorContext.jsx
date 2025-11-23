"use client";

import {createContext, useContext, useState} from "react";

const EditorContext = createContext();

export function EditorProvider({children}){
    const [code, setCode] = useState("");

    return (
        <EditorContext.Provider value={{code, setCode}}>
            {children}
        </EditorContext.Provider>
    )
}

export function useEditor(){
    return useContext(EditorContext);
}