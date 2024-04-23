import "./SideBarMenu.css"
import {useState} from "react";
import {Link} from "react-router-dom";
import {CloseBtn} from "../../CloseBtn/CloseBtn.jsx";

export function SideBarMenu({ isVisible, setVisible }) {
    const [isHovered, setHovered] = useState(false);
    const sidebarClasses = `SideBarMenu ${isVisible ? 'visible' : ''}`;

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
            </div>
        </div>
    )
}