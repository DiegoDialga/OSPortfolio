import { useEffect, useState } from "react";

const BatteryStatus = () => {
    const [battery, setBattery] = useState({
        level: 1,
        charging: true
    });

    useEffect(() => {
        let batteryManager;

        const updateBatteryStatus = () => {
            setBattery({
                level: batteryManager.level,
                charging: batteryManager.charging
            });
        };

        const getBattery = async () => {
            if ('getBattery' in navigator) {
                batteryManager = await navigator.getBattery();
                updateBatteryStatus();

                batteryManager.addEventListener('levelchange', updateBatteryStatus);
                batteryManager.addEventListener('chargingchange', updateBatteryStatus);
            } else {
                console.log("Battery API not supported on this browser.");
            }
        };

        getBattery();

        return () => {
            if (batteryManager) {
                batteryManager.removeEventListener('levelchange', updateBatteryStatus);
                batteryManager.removeEventListener('chargingchange', updateBatteryStatus);
            }
        };
    }, []);

    return (
        <div className="text-white w-fit m-4 flex-row justify-center items-center">
            <p suppressHydrationWarning className="text-sm font-thin">{Math.round(battery.level * 100)}%</p>
        </div>
    );
}

export default BatteryStatus;