import {Fragment} from "react";

export function DateInput({ date, setDate }) {
    const handleStartDateChange = (date) => {
        setDate(date);
    };

    return (
        <Fragment>
            <label htmlFor="Date">Start Date: </label>
            <input
                className="CalculatorInputItem"
                type="datetime-local"
                id="startDate"
                value={date.toISOString().slice(0, -8)}
                onChange={(e) => handleStartDateChange(new Date(e.target.value))}
            />
        </Fragment>
    );
}