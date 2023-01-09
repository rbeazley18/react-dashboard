import { useState } from "react";

export default function WidgetSwitch({switchStatus, setSwitchStatus, onShow}) {
    

    // function handleToggle() {
    //     setSwitchStatus(!switchStatus);
    //     return switchStatus;
    // }

    return (
        <div className="form-check form-switch">
            <input onChange={onShow} checked={switchStatus} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
        </div>
    )
}