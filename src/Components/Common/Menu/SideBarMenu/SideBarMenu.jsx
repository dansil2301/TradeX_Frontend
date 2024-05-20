import "./SideBarMenu.css"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {CloseBtn} from "../../CloseBtn/CloseBtn.jsx";
import {TraderToken} from "../../../../Logic/TraderLogic/TraderToken.js";

export function SideBarMenu({ isVisible, setVisible }) {
    const [isHovered, setHovered] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const sidebarClasses = `SideBarMenu ${isVisible ? 'visible' : ''}`;

    useEffect(() => {
        const status = TraderToken.getTraderStatusFromToken();
        if (status === "ADMIN") {
            setIsAdmin(true);
        }
        else {
            setIsAdmin(false);
        }
    }, [])

    return (
        <div className={sidebarClasses} id="SideBarIndex">
            <div className="closeBtn" id="closeBtnId">
                <CloseBtn onClick={() => setVisible(false)} isHovered={isHovered} setHovered={setHovered}/>
            </div>
            <div className="WebsiteSections">
                <Link to="/">
                    <button className="WebsiteSectionsEl">Home</button>
                </Link>
                <Link to="/account">
                    <button className="WebsiteSectionsEl">Account</button>
                </Link>
                <Link to="/terminal">
                    <button className="WebsiteSectionsEl">Terminal</button>
                </Link>
                {isAdmin && (
                    <Link to="/admin">
                        <button className="WebsiteSectionsEl">Admin Panel</button>
                    </Link>
                )}
            </div>
        </div>
    )
}