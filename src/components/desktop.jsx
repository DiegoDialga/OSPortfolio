"use client";

import { useState } from "react";
import Icon from "@/components/icon";
import Window from "@/components/utils/window";
import Taskbar from "@/components/taskbar/taskbar";
import TerminalApp from "@/components/TerminalApp";
import FolderApp from "@/components/FolderApp";
import GoogleApp from "@/components/GoogleApp";
import Draggable from "@/components/utils/draggable";
import './desktop.css';

const Desktop = () => {
    const [openWindows, setOpenWindows] = useState([]);
    const [maximizedWindows, setMaximizedWindows] = useState([]);
    const [minimizedWindows, setMinimizedWindows] = useState([]);
    const [focusedApp, setFocusedApp] = useState("");

    const apps = [
        { name: "Terminal", logo: "/images/window-cmd-icon.png" },
        { name: "Folder", logo: "/images/folder-icon.webp" },
        { name: "Google Chrome", logo: "/images/chrome-icon.png" }
    ];

    const appComponents = {
        Terminal: TerminalApp,
        Folder: FolderApp,
        "Google Chrome": GoogleApp,
    };


    const openApp = (appName) => {
        if (!openWindows.includes(appName)) {
            setOpenWindows([...openWindows, appName]);
        }
    };

    const closeApp = (appName) => {
        setOpenWindows(openWindows.filter((x) => x !== appName));
    };

    const maximizeApp = (appName) => {
        if (!maximizedWindows.includes(appName)) {
            setMaximizedWindows([...maximizedWindows, appName]);
        }
    };

    const minimizeApp = (appName) => {
        if (!minimizedWindows.includes(appName)) {
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

    return (
        <div className="absolute inset-0 w-screen h-screen bg-cover bg-center overflow-hidden">
            <div className="grid grid-cols-3 gap-10 p-10">
                {apps.map((app, index) => (
                    <Draggable key={app.name} defaultPosition={{ x: index * 150, y: 50 }}>
                        <Icon
                            logo={app.logo}
                            name={app.name}
                            onDoubleClick={() => openApp(app.name)}
                        />
                    </Draggable>
                ))}
            </div>

            {openWindows.map((app) => {
                const AppComponent = appComponents[app];
                const appData = apps.find((a) => a.name === app);

                return AppComponent ? (
                    <Window
                        key={app}
                        onClick={() => bringAppToFront(app)}
                        style={{ zIndex: focusedApp === app ? 1000 : 1 }}
                    >
                        <AppComponent
                            title={appData?.name || app}
                            onClose={() => closeApp(app)}
                            onMaximize={() => maximizeApp(app)}
                            onMinimize={() => minimizeApp(app)}
                            maximized={maximizedWindows.includes(app)}
                            minimized={minimizedWindows.includes(app)}
                            onRestoreMaximized={() => restoreMaximizedApp(app)}
                        />
                    </Window>
                ) : null;
            })}

            {/* Taskbar */}
            <Taskbar
                openWindows={openWindows}
                restoreApp={restoreMinimizedApp}
                minimizeApp={minimizeApp}
                minimized={minimizedWindows}
                focusedApp={bringAppToFront}
            />
        </div>
    );
};

export default Desktop;
