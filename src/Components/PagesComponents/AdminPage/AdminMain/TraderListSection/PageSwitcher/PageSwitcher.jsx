import "./PageSwitcher.css"

export function PageSwitcher({ currentPage, totalPages, setCurrentPage }) {
    const PagePLus = () => {
        if (currentPage + 1 < totalPages - 1)
        {setCurrentPage(currentPage + 1)}
    }

    const PageMinus = () => {
        if (currentPage - 1 > -1)
        {setCurrentPage(currentPage - 1)}
    }

    return (
        <div className="PageSwitcher">
            <button className="BtnBackward ArrowBtn" onClick={PageMinus}></button>
            <span className="PageSwitcherText">{currentPage + 1} / {totalPages}</span>
            <button className="BtnForward ArrowBtn" onClick={PagePLus}></button>
        </div>
    );
}