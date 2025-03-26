
import {useEffect, useState} from "react";

const BatteryStatus = () => {
    const [battery, setBattery] = useState({
        level: 1,
        charging: true
    });

    useEffect(() => {
        const getBattery = async () => {
            if('getBattery' in navigator) {
                const battery = await navigator.getBattery();
                setBattery({
                    level: battery.level,
                    charging: battery.charging
                });

                battery.addEventListener('levelchange', () =>
                    setBattery((prev) => ({ ...prev, level: battery.level }))
                );
                battery.addEventListener('chargingchange', () =>
                    setBattery((prev) => ({ ...prev, charging: battery.charging }))
                );
            }else{
                console.log("Battery API not supported on this browser.")
            }
        };

        getBattery();
    }, []);

    return (
        <div className="text-white w-fit m-4 flex-row justify-center items-center">
            <p>{Math.round(battery.level * 100)}%</p>
            <p>{battery.charging ? 'Charging ⚡' : 'Not Charging 🔋'}</p>
        </div>
    );
}

export default BatteryStatus;