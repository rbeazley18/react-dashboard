import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

export default function WidgetMenu() {
    // const [_document, set_document] = useState(null)

    // useEffect(() => {
    //     set_document(document)
    // }, [])
    return (
        <div>
            {
                createPortal(
                    <WidgetList />,
                    document.body
                )
            }
        </div>

    )
}

function WidgetList() {
    return (
        <div>
            <div className="widget-menu container" >
                <div className="col-1 border h-100 p-5" style={{ height: 100 }}>
                </div>

            </div>
        </div>
    )
}