import "./TraderItem.css"
import settingsImage from '../../../../../../../assets/AdminPage/OptionsMenu.png';
import {useEffect, useState} from "react";
import {EditWindow} from "../../EditWindow/EditWindow.jsx";

export function TraderItem({ item }) {
    const [isEditOpened, setIsEditOpened] = useState(false);

    const showHideWindow = () => {
        setIsEditOpened(!isEditOpened);
    }

    return (
        <>
            <tr>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.status}</td>
                <td>{item.createdAt.split("T")[0]}</td>
                <td>
                    <img src={settingsImage} alt="Trader" className="trader-image" onClick={showHideWindow}/>
                </td>
            </tr>

            {isEditOpened && (
                <EditWindow setIsEditOpened={setIsEditOpened} trader={item} />
            )}
        </>
    );
}