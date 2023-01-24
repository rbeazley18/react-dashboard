import { useState } from "react";
import WeatherWidget from "./weather";
import StockWidget from "./stocks";

export default function Widgets() {
    return (
        <div className="all-widgets">
            <div className="widget m-3">
                <WeatherWidget />
            </div>
            <div className="widget m-3">
                <StockWidget />
            </div>
        </div>
    )
}