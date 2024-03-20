import PropTypes from "prop-types";

export function DropdownOption({ value, name, setStrategy, setIsOpen, isOpen}) {
    const handleClick = () => {
        setStrategy(name);
        setIsOpen(!isOpen);
    };

    return (
        <button className="DropdownOption" onClick={handleClick} value={value}>
            {name}
        </button>
    );
}

DropdownOption.propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    setStrategy: PropTypes.func.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
};