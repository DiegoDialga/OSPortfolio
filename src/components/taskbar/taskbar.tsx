import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import BatteryStatus from "@/components/taskbar/batteryStatus";

const iconMapping = {
    Terminal: "/images/window-cmd-icon.png",
    Folder: "/images/folder-icon.webp",
    "Google Chrome": "/images/chrome-icon.png",
    Suggestion: "/images/suggestion.png",
    Tinder: "/images/tinder-icon.png",
};

const Taskbar = ({ openWindows, restoreApp, minimizeApp, minimized, focusedApp }) => {
    const [time, setTime] = useState(new Date());
    const startMenuRef = useRef(null);
    const [showStartMenu, setShowStartMenu] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const HandleClickOutside = (event) => {
            if (startMenuRef.current && !startMenuRef.current.contains(event.target)) {
                setShowStartMenu(false);
            }
        };

        if (showStartMenu) document.addEventListener("click", HandleClickOutside);
        return () => document.removeEventListener("click", HandleClickOutside);
    }, [showStartMenu]);

    return (
        <div className="fixed z-[1000] h-[50px] pr-4 pl-4 bottom-0 w-full bg-transparent backdrop-blur-2xl text-white flex justify-center items-center transition-all">

            {/* Start Button */}
            <div className="w-[60px] h-[50px] flex justify-center items-center hover:bg-white/10 hover:backdrop-blur-sm transition-all rounded-[10px]">
                <Image
                    className="bg-cover cursor-pointer"
                    onClick={() => setShowStartMenu(prev => !prev)}
                    width={30}
                    height={30}
                    src="/images/window-icon.png"
                    alt="Window Icon"
                />
            </div>

            {/* Start Menu Mock */}
            {showStartMenu && <p ref={startMenuRef}>fff</p>}

            {/* Taskbar Icons */}
            <div className="h-full w-full flex flex-row justify-center items-center space-x-2">
                {openWindows.map((app) => {
                    const isMinimized = minimized.includes(app);
                    const isActive = !isMinimized;

                    return (
                        <div
                            key={app}
                            onClick={() => {
                                if (isMinimized) restoreApp(app);
                                else minimizeApp(app);
                                focusedApp(app);
                            }}
                            className={`
                                relative w-[50px] h-[45px] flex justify-center items-center
                                rounded-lg cursor-pointer transition-all ml-[35px]
                                ${isActive ? "bg-white/10 backdrop-blur-sm" : "bg-transparent"}
                            `}
                        >
                            <Image width={35} height={35} src={iconMapping[app]} alt="icon" />

                            {/* Indicator Line (Windows 11 style) */}
                            <div
                                className={`
                                    absolute bottom-0  h-[3px] rounded-full mx-auto
                                    ${isActive ? "w-2/5 bg-blue-500" : "w-1/5 bg-gray-400/50"}
                                `}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Clock + Battery */}
            <div className="ml-auto w-fit flex flex-row justify-center items-center">
                <BatteryStatus />
                <div className="font-thin text-sm flex-col items-end justify-end" suppressHydrationWarning>
                    <p>
                        {time.getHours()}:{time.getMinutes().toString().padStart(2, "0")}
                    </p>
                    <p>
                        {time.getHours()}-{time.getMonth() + 1}-{time.getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Taskbar;
