import { useState } from "react";
import WeatherWidget from "./weather";
import StockWidget from "./stocks";

export default function Widgets() {
    const [switchStatus, setSwitchStatus] = useState(false);

    return (
        <>
            <WeatherWidget 
                switchStatus={switchStatus}
                setSwitchStatus={setSwitchStatus}
            />
            <StockWidget 
                switchStatus={switchStatus}
                setSwitchStatus={setSwitchStatus}
            />
        </>
    )
}