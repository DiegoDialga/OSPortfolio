
import Image from "next/image";
import BatteryStatus from "@/components/taskbar/batteryStatus";

const iconMapping = {
    'Terminal': '/images/window-cmd-icon.png',
    'Projects': '/images/folder-icon.webp',
}

const Taskbar = ({ openWindows, restoreApp, minimizeApp, minimized, focusedApp }) => {

    return (
        <div className="fixed z-[1000] h-[50px] pr-4 pl-4 bottom-0 w-full bg-transparent backdrop-blur-2xl text-white flex justify-center items-center transition-all">
            <div className="w-[60px] h-[50px] flex justify-center items-center hover:bg-white/10 hover:backdrop-blur-sm transition-all bg-transparent rounded-[10px]">
            <Image className="w-[40px] h-[40px] bg-cover " width={40} height={40} src="/images/window-icon.png" alt={"Window Icon"} />
            </div>
            <div className="h-full w-full flex flex-row justify-center items-center space-x-2">
                {openWindows.map((app: string) => (
                    <div
                        onClick={() => {
                            if(minimized.includes(app)) {
                                restoreApp(app);
                            }else minimizeApp(app);
                            focusedApp(app);
                        }}
                        key={app}
                        className="w-[60px] h-[60px] flex justify-center items-center
                        hover:bg-white/10 hover:backdrop-blur-sm ml-[40px]
                        cursor-pointer rounded-lg">
                        <Image className="w-[40px] h-[40px]" width={40} height={40}  src={iconMapping[app as keyof typeof iconMapping]} alt={"icon"} />
                    </div>
                ))}
            </div>

            <div className="ml-auto w-fit flex flex-row justify-center items-center">
                <BatteryStatus />
                <div className="w-fit" suppressHydrationWarning>{new Date().toLocaleTimeString()}</div>
            </div>
        </div>
    );
};

export default Taskbar;