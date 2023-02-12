import { useState } from "react";
import WeatherWidget from "./weatherWidget";
import StockWidget from "./stockWidget";
import QuoteWidget from "./quoteWidget";

export default function Widgets() {
    return (
        <div className="all-widgets container ">
            <div className="row justify-content-between">
                <WeatherWidget />
                <StockWidget />
                {/* <QuoteWidget /> */}
            </div>
        </div>
    )
}