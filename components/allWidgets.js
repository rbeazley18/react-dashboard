import { useState } from "react";
import WeatherWidget from "./weatherWidget";
import StockWidget from "./stockWidget";
import QuoteWidget from "./quoteWidget";
import NewsWidget from "./newsWidget";

export default function Widgets() {
    return (
        <div className="all-widgets container-fluid">
            <WeatherWidget />
            <StockWidget />
            <QuoteWidget />
            <NewsWidget />
        </div>
    )
}