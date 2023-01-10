import { useState } from "react";
import WeatherWidget from "./weather";
import StockWidget from "./stocks";

export default function Widgets() {
    // const [switchStatus, setSwitchStatus] = useState(false);

    return (
        <>
            <div className="m-5">
                <WeatherWidget
                    // switchStatus={switchStatus}
                    // setSwitchStatus={setSwitchStatus}
                />
            </div>
            <div className="m-5">
                <StockWidget
                    // switchStatus={switchStatus}
                    // setSwitchStatus={setSwitchStatus}
                />
            </div>
        </>
    )
}