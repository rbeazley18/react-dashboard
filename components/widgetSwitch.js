export default function WidgetSwitch({switchStatus, setSwitchStatus}) {
    function handleToggle() {
        setSwitchStatus(!switchStatus);
        return switchStatus;
    }

    return (
        <div className="form-check form-switch m-5">
            <input onChange={handleToggle} checked={switchStatus} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Weather</label>
        </div>
    )
}