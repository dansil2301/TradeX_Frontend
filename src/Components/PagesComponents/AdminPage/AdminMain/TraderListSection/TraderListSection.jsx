import "./TraderListSection.css"
import {Search} from "./Search/Search.jsx";
import {TraderList} from "./TraderList/TraderList.jsx";
import {useEffect, useState} from "react";
import {AdminTransmitter} from "../../../../../Logic/AdminLogic/AdminTransmitter.js";
import {PageSwitcher} from "./PageSwitcher/PageSwitcher.jsx";

export function TraderListSection() {
    const PAGE_SIZE = 7;
    const [currentPage, setCurrentPage] = useState(0)
    const [searchString, setSearchString] = useState("");
    const [traderList, setTraderList] = useState({});

    useEffect(() => {
        async function geTradersPages() {
            const traders = await AdminTransmitter.GetSearchedTradersPages(currentPage, PAGE_SIZE, searchString);
            setTraderList(traders);
        }

        geTradersPages();
    }, [searchString, currentPage]);

    return (
        <div className="TraderListSection">
            <Search setSearchString={setSearchString}/>
            <TraderList data={traderList.content}/>
            <PageSwitcher currentPage={currentPage} totalPages={traderList.totalPages} setCurrentPage={setCurrentPage}/>
        </div>
    );
}