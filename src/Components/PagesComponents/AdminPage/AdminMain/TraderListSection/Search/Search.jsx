import "./Search.css"

export function Search({setSearchString}) {
    const onSearch = (event) => {
        setSearchString(event.target.value);
    };

    return (
        <div className="Search">
            <input className="customInputSearch" placeholder="Search" onChange={onSearch} />
        </div>
    );
}