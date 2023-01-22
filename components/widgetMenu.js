import { useState, useEffect } from "react";
import ClientPortal from "./clientPortal";
import StockWidget from "./stocks";
import Widgets from "./widgets";

export default function ViewWidgetsButton() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [switchStatus, setSwitchStatus] = useState(false);
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
                                    key="stocks"
                                    switchStatus={switchStatus}
                                    setSwitchStatus={setSwitchStatus}
                                />
                                {/* <Widgets /> */}
                            </div>
                        </div>
                    </div>
                </ClientPortal>
            )}
            {/* {switchStatus && (<StockWidget />)} */}
        </>
    )
}

function StockSwitch({ switchStatus, setSwitchStatus }) {

    useEffect(() => {
        if (typeof window !== "undefined") {
            setSwitchStatus(JSON.parse(window.localStorage.getItem('switchStatus')));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem('switchStatus', switchStatus);
        }
    }, [switchStatus]);

    function handleToggle() {
        return setSwitchStatus(!switchStatus);
        // return switchStatus;
    }

    return (
        <div className="form-check form-switch m-3">
            <input onChange={handleToggle} checked={switchStatus} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label text-light" htmlFor="flexSwitchCheckDefault">Stocks</label>
        </div>
    )
}