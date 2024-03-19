import PropTypes from "prop-types";

export function DropdownOption({ value, name }) {
    return (
        <button className="DropdownOption" key={name} value={value}>{name}</button>
    )
}

DropdownOption.propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};