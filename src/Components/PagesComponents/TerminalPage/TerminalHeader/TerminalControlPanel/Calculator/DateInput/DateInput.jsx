import {Fragment} from "react";

export function DateInput({ date, setDate, Name }) {
    const handleStartDateChange = (date) => {
        setDate(date);
    };

    return (
        <Fragment>
            <label htmlFor="Date">{Name}: </label>
            <input
                className="CalculatorInputItem"
                type="datetime-local"
                id={Name.replace(/\s/g, '')}
                value={date.toISOString().slice(0, -8)}
                onChange={(e) => {handleStartDateChange(new Date(e.target.value))}}
            />
        </Fragment>
    );
}