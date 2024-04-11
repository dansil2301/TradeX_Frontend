import "./SideBarMenu.css"
import {useState} from "react";
import {Link} from "react-router-dom";

export function SideBarMenu({ isVisible, setVisible }) {
    const [isHovered, setHovered] = useState(false);
    const sidebarClasses = `SideBarMenu ${isVisible ? 'visible' : ''}`;

    return (
        <div className={sidebarClasses} id="SideBarIndex">
            <div className="closeBtn" id="closeBtnId">
                <svg width="30" height="30" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"
                     onMouseOver={() => setHovered(true)}
                     onMouseOut={() => setHovered(false)}
                     onClick={() => setVisible(false)}>
                    <line style={{transition: "stroke 0.3s ease-in-out"}} y1="-1.5" x2="49.4975" y2="-1.5"
                          transform="matrix(0.707107 -0.707107 0.717263 0.696803 3.64087 38.139)"
                          stroke={isHovered ? "#666666" : "#969696"} strokeWidth="3"/>
                    <line style={{transition: "stroke 0.3s ease-in-out"}} y1="-1.5" x2="49.4975" y2="-1.5"
                          transform="matrix(-0.707107 -0.707107 0.696803 -0.717263 37.6409 35.3002)"
                          stroke={isHovered ? "#666666" : "#969696"} strokeWidth="3"/>
                </svg>
            </div>
            <div className="WebsiteSections">
                <Link to="/"><button className="WebsiteSectionsEl">Home</button></Link>
                <Link to="/account"><button className="WebsiteSectionsEl">Account</button></Link>
                <Link to="/terminal"><button className="WebsiteSectionsEl">Terminal</button></Link>
            </div>
        </div>
    )
}