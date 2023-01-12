import { useState, useEffect } from "react";
import ClientPortal from "./clientPortal";
import Widgets from "./widgets";

export default function ViewWidgetsButton() {
    const [menuOpen, setMenuOpen] = useState(false)

    // useEffect(() => {

    // }, [])

    return (
        <>
            <button type="button" onClick={() => setMenuOpen(true)} className="btn btn-primary fw-bold">Select Widgets</button>
            {menuOpen && (
                <ClientPortal selector="#widget-menu">
                    <div className="container mr-auto widget-menu border">
                        <div>
                            <Widgets />
                        </div>
                        <button className="btn btn-danger" type="button" onClick={() => setMenuOpen(false)}>
                            Close Menu
                        </button>
                    </div>
                </ClientPortal>
            )}
        </>
    )
}