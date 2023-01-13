import { useState, useEffect } from "react";
import ClientPortal from "./clientPortal";
import Widgets from "./widgets";

export default function ViewWidgetsButton() {
    const [menuOpen, setMenuOpen] = useState(false)

    // useEffect(() => {

    // }, [])

    return (
        <>
            {!menuOpen && (<button type="button" onClick={() => setMenuOpen(true)} className="btn btn-primary fw-bold">Widgets</button>)}
            {menuOpen && (
                <ClientPortal selector="#widget-menu">
                    <div className="container h-100 widget-menu border">

                        <div className="row justify-content-end">
                            <button className="btn-close btn-close-white p-0 m-1 close-button" type="button" onClick={() => setMenuOpen(false)} aria-label="Close">
                            </button>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <Widgets />
                            </div>
                        </div>
                    </div>
                </ClientPortal>
            )}
        </>
    )
}