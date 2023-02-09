import { useState } from "react";
import WeatherWidget from "./weatherWidget";
import StockWidget from "./stockWidget";
import QuoteWidget from "./quoteWidget";

export default function Widgets() {
    return (
        <div className="all-widgets">
                <div className="row justify-content-center">
                    <div className="col">
                        <WeatherWidget />
                    </div>
                    <div className="col">
                        <StockWidget />
                    </div>
                    {/* <div className="col">
                        <QuoteWidget />
                    </div> */}
                </div>
        </div>
    )
}