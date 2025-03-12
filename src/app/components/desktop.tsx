"use client"

import {useState} from "react";
import Icon from "@/app/components/icon";
import Window from "@/app/components/window";
import Taskbar from "@/app/components/taskbar";
import WindowCmdIcon from '../../public/window-cmd-icon.png';
import FolderIcon from '../../public/folder-icon.webp';
import TerminalApp from "@/app/components/TerminalApp";
import './desktop.css';
import FolderApp from "@/app/components/FolderApp";


const Desktop = () => {
    const [openWindows, setOpenWindows] = useState([]);
    const [maximizedWindows, setMaximizedWindows] = useState([]);
    const [minimizedWindows, setMinimizedWindows] = useState([]);
    const [focusedApp, setFocusedApp] = useState(null);

    const openApp = (appName: string) => {
        if(!openWindows.includes(appName)) {
            setOpenWindows([...openWindows, appName]);
        }
    };

    const closeApp = (appName: string) => {
        setOpenWindows(openWindows.filter((x) => x !== appName));
    };

    const maximizeApp = (appName: string) => {
        if(!maximizedWindows.includes(appName)) {
            setMaximizedWindows([...maximizedWindows, appName]);
        }
    };

    const minimizeApp = (appName) => {
        if(!minimizedWindows.includes(appName)) {
            setMinimizedWindows([...minimizedWindows, appName]);
            setFocusedApp(null);
        }
    };

    const restoreMaximizedApp = (appName) => {
        setMaximizedWindows(maximizedWindows.filter((app) => app !== appName));
    };

    const restoreMinimizedApp = (appName) => {
        setMinimizedWindows(minimizedWindows.filter((app) => app !== appName));
    };

    const bringAppToFront = (appName) => setFocusedApp(appName);
    return(
        <div className="absolute inset-0 w-screen h-screen bg-cover bg-center overflow-hidden">
            <Icon className="absolute top-10 left-10" logo={WindowCmdIcon} name="Command prompt" onDoubleClick={() => openApp("Terminal")} />
            <Icon className="absolute top-10 left-[200px]" logo={FolderIcon} name="Folder" onDoubleClick={() => openApp('Projects')} />


            {openWindows.map((app) => (
                <Window
                    key={app}
                    onClick={() => bringAppToFront(app)}
                    style={{
                    zIndex: focusedApp === app ? 1000 : 1,
                    }}>
                    {
                        app === "Terminal" ?
                            <TerminalApp title={"Command Prompt"} onClose={() => closeApp(app)}
                                         onMaximize={() => maximizeApp(app)}
                                         onMinimize={() => minimizeApp(app)}
                                         maximized={maximizedWindows.includes(app)}
                                         minimized={minimizedWindows.includes(app)}
                                        onRestoreMaximized={() => restoreMaximizedApp(app)}/>
                            :
                            <FolderApp title={"Folder"} onClose={() => closeApp(app)}
                                       onMaximize={() => maximizeApp(app)}
                                       onMinimize={() => minimizeApp(app)}
                                       maximized={maximizedWindows.includes(app)}
                                       minimized={minimizedWindows.includes(app)}
                                       onRestoreMaximized={() => restoreMaximizedApp(app)}/>
                    }
                </Window>
            ))}

            <Taskbar
                openWindows={openWindows}
                restoreApp={restoreMinimizedApp}
                minimizeApp={minimizeApp}
                minimized={minimizedWindows}
                focusedApp={bringAppToFront}/>

        </div>
    )
}

export default Desktop;