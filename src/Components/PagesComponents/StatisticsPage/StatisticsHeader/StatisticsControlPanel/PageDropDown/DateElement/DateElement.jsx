import "./DateElement.css"
import {useState} from "react";

export function DateElement({ setDateElement, palceholder }) {
    const [selectedDate, setSelectedDate] = useState('');

    // Handle date change
    const handleDateChange = (event) => {
        const dateValue = event.target.value;
        setSelectedDate(dateValue);
        setDateElement(dateValue);
    };

    return (
        <div className="fromElementWrapper">
            <label htmlFor="fromDate">{palceholder}</label>
            <input
                id="fromDate"
                className="fromElement"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
            />
        </div>
    );
}