import { useState } from "react";
import WeatherWidget from "./weather";
import StockWidget from "./stocks";

export default function Widgets() {
    // const [switchStatus, setSwitchStatus] = useState(false);

    return (
        <div className="text-light">
            <div className="mx-3">
                <WeatherWidget
                    // switchStatus={switchStatus}
                    // setSwitchStatus={setSwitchStatus}
                />
            </div>
            <div className="mx-3">
                <StockWidget
                    // switchStatus={switchStatus}
                    // setSwitchStatus={setSwitchStatus}
                />
            </div>
        </div>
    )
}