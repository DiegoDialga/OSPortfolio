import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import BatteryStatus from "@/components/taskbar/batteryStatus";

const iconMapping = {
    'Terminal': '/images/window-cmd-icon.png',
    'Folder': '/images/folder-icon.webp',
    'Google Chrome': '/images/chrome-icon.png',
};

const Taskbar = ({ openWindows, restoreApp, minimizeApp, minimized, focusedApp }) => {
    const [time, setTime] = useState(new Date());
    const startMenuRef = useRef(null);
    const [showStartMenu, setShowStartMenu] = useState(false);
    const batteryRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const HandleClickOutside = (event) => {
            if(startMenuRef.current && !startMenuRef.current.contains(event.target)){
                setShowStartMenu(false)
            }
        };

        if(showStartMenu) document.addEventListener("click", HandleClickOutside);

        return () => {
            document.removeEventListener("click", HandleClickOutside);
        }
    }, [showStartMenu]);
    return (
        <div className="fixed z-[1000] h-[50px] pr-4 pl-4 bottom-0 w-full bg-transparent backdrop-blur-2xl text-white flex justify-center items-center transition-all">
            <div className="w-[60px] h-[50px] flex justify-center items-center hover:bg-white/10 hover:backdrop-blur-sm transition-all bg-transparent rounded-[10px]">
                <Image className="bg-cover"
                       onClick={() => {
                           setShowStartMenu(prev => !prev);
                       }}
                       width={30}
                       height={30}
                       src="/images/window-icon.png" alt="Window Icon" />
            </div>
            {
                showStartMenu &&(
                    <p ref={startMenuRef}>fff</p>
                )
            }
            <div className="h-full w-full flex flex-row justify-center items-center space-x-2">
                {openWindows.map((app) => (
                    <div
                        onClick={() => {
                            if (minimized.includes(app)) {
                                restoreApp(app);
                            } else minimizeApp(app);
                            focusedApp(app);
                        }}
                        key={app}
                        className="w-[50px] h-[45px] flex justify-center items-center
                        hover:bg-white/10 hover:backdrop-blur-sm ml-[35px]
                        cursor-pointer rounded-lg">
                        <Image  width={35} height={35} src={iconMapping[app]} alt="icon" />
                    </div>
                ))}
            </div>
            <div className="ml-auto w-fit flex flex-row justify-center items-center">
                <BatteryStatus />
                <div className="font-thin text-sm" suppressHydrationWarning>
                    <p>
                        {time.getHours()}:{time.getMinutes().toString().padStart(2, '0')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Taskbar;
