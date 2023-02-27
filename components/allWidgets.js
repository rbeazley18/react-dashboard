import { useState } from "react";
import WeatherWidget from "./weatherWidget";
import StockWidget from "./stockWidget";
import QuoteWidget from "./quoteWidget";
import NewsWidget from "./newsWidget";

export default function Widgets() {
    return (
        <div className="all-widgets container-fluid">
            <QuoteWidget />
            <div className="row justify-content-evenly m-2 g-3">
                <WeatherWidget />
                <StockWidget />
            </div>
            <NewsWidget />
        </div>
    )
}