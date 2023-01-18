import { useState } from "react";
import WeatherWidget from "./weather";
import StockWidget from "./stocks";

export default function Widgets() {
    // const [switchStatus, setSwitchStatus] = useState(false);

    return (
        <div className="text-light">
            <div className="mx-3">
                <WeatherWidget />
            </div>
            <div className="mx-3">
                <StockWidget />
            </div>
        </div>
    )
}