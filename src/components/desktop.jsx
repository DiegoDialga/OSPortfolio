"use client"

import {useState} from "react";
import Icon from "@/components/icon";
import Window from "@/components/window";
import Taskbar from "@/components/taskbar/taskbar";
import TerminalApp from "@/components/TerminalApp";
import './desktop.css';
import FolderApp from "@/components/FolderApp";
import Draggable from "@/components/utils/draggable";


const Desktop = () => {
    const [openWindows, setOpenWindows] = useState([]);
    const [maximizedWindows, setMaximizedWindows] = useState([]);
    const [minimizedWindows, setMinimizedWindows] = useState([]);
    const [focusedApp, setFocusedApp] = useState(null);

    const openApp = (appName) => {
        if(!openWindows.includes(appName)) {
            setOpenWindows([...openWindows, appName]);
        }
    };

    const closeApp = (appName) => {
        setOpenWindows(openWindows.filter((x) => x !== appName));
    };

    const maximizeApp = (appName) => {
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
            <Draggable>
            <Icon className="absolute top-10 left-10" logo={'/images/window-cmd-icon.png'} name="Command prompt" onDoubleClick={() => openApp("Terminal")} />
            </Draggable>
            <Draggable>
            <Icon className="absolute top-10 left-[200px]" logo={'/images/folder-icon.webp'} name="Folder" onDoubleClick={() => openApp('Projects')} />
            </Draggable>

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