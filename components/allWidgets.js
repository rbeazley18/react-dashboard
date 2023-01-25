import { useState } from "react";
import WeatherWidget from "./weather";
import StockWidget from "./stocks";

export default function Widgets() {
    return (
        <div className="all-widgets">
                <WeatherWidget />
                <StockWidget />
        </div>
    )
}