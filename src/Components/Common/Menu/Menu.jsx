import {MenuBtn} from "./MenuBtn/MenuBtn.jsx";
import {SideBarMenu} from "./SideBarMenu/SideBarMenu.jsx";
import {useState} from "react";

export function Menu() {
    const [isVisible, setVisible] = useState(false);

    return (
        <>
            <MenuBtn setVisible={setVisible}/>
            <SideBarMenu isVisible={isVisible} setVisible={setVisible}/>
        </>
    )
}