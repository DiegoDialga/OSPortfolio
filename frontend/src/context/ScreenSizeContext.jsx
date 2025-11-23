"use client";
import {createContext, useContext, useEffect, useState} from "react";

const ScreenSizeContext = createContext(null);

export function ScreenSizeProvider({children}){
    const [isMobile, setIsMobile] = useState(false);

    useEffect(()=>{

        const checkSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkSize();
        window.addEventListener("resize", checkSize);
    }, []);

    return(
        <ScreenSizeContext.Provider value={{isMobile}}>
            {children}
        </ScreenSizeContext.Provider>
    )
}

export function useScreenSize(){
    return useContext(ScreenSizeContext);
}