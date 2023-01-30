import { useState } from "react";
import WeatherWidget from "./weatherWidget";
import StockWidget from "./stockWidget";

export default function Widgets() {
    return (
        <div className="all-widgets mx-auto">
                <div className="row justify-content-evenly">
                    <div className="col">
                        <WeatherWidget />
                    </div>
                    <div className="col">
                        <StockWidget />
                    </div>
                </div>
        </div>
    )
}