import { useState, useEffect } from "react";
import ClientPortal from "./clientPortal";
import StockWidget from "./stocks";
import Widgets from "./widgets";

export default function ViewWidgetsButton() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [stockSwitchStatus, setStockSwitchStatus] = useState(false);
    const [weatherSwitchStatus, setWeatherSwitchStatus] = useState(false);

    // useEffect(() => {

    // }, [])

    return (
        <>
            {!menuOpen && (<button type="button" onClick={() => setMenuOpen(true)} className="btn btn-primary fw-bold">Widgets</button>)}
            {menuOpen && (
                <ClientPortal selector="#widget-menu">
                    <div className="d-block container h-100 widget-menu rounded-end shadow-lg">
                        <div className="row justify-content-end">
                            <button className="btn-close btn-close-white p-0 m-1 close-button" type="button" onClick={() => setMenuOpen(false)} aria-label="Close">
                            </button>
                        </div>
                        <div className="row justify-content-start">
                            <div className="col-4">
                                <StockSwitch
                                    stockSwitchStatus={stockSwitchStatus}
                                    setStockSwitchStatus={setStockSwitchStatus}
                                />
                                <WeatherSwitch
                                    weatherSwitchStatus={weatherSwitchStatus}
                                    setWeatherSwitchStatus={setWeatherSwitchStatus}
                                />
                            </div>
                        </div>
                    </div>
                </ClientPortal>
            )}
        </>
    )
}

function StockSwitch({ stockSwitchStatus, setStockSwitchStatus }) {
    useEffect(() => {
        setStockSwitchStatus(JSON.parse(window.localStorage.getItem('stockSwitchStatus')));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('stockSwitchStatus', stockSwitchStatus);
    }, [stockSwitchStatus]);

    function handleToggle() {
        return setStockSwitchStatus(!stockSwitchStatus);
    }

    return (
        <div className="form-check form-switch m-3">
            <input onChange={handleToggle} checked={stockSwitchStatus} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label text-light" htmlFor="flexSwitchCheckDefault">Stocks</label>
        </div>
    )
}

function WeatherSwitch({ weatherSwitchStatus, setWeatherSwitchStatus }) {
    useEffect(() => {
        setWeatherSwitchStatus(JSON.parse(window.localStorage.getItem('weatherSwitchStatus')));
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , []);

    useEffect(() => {
        window.localStorage.setItem('weatherSwitchStatus', weatherSwitchStatus);
    }, [weatherSwitchStatus]);

    function handleToggle() {
        return setWeatherSwitchStatus(!weatherSwitchStatus);
    }

    return (
        <div className="form-check form-switch m-3">
            <input onChange={handleToggle} checked={weatherSwitchStatus} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label text-light" htmlFor="flexSwitchCheckDefault">Weather</label>
        </div>
    )
}