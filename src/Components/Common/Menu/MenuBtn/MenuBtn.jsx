import "./MenuBtn.css"
import {useState} from "react";

export function MenuBtn({ setVisible }) {
    const [isHovered, setHovered] = useState(false);

    const hoverEffect = (position) => {
        let lineStyle;

        if (position === "middle") {
            lineStyle = {
                transition: 'stroke-dashoffset 0.3s ease-in-out',
                strokeDasharray: '59',
                strokeDashoffset: isHovered ? '0' : '9',
            }
        }
        else {
            lineStyle = {
                transition: 'stroke-dashoffset 0.3s ease-in-out',
                strokeDasharray: '59',
                strokeDashoffset: isHovered ? '9' : '0',
            }
        }

        return lineStyle;
    }

    return (
        <div className="MenuSVGcontainer">
            <svg width="50"
                 height="38"
                 viewBox="0 0 60 38"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
                 onMouseOver={() => setHovered(true)}
                 onMouseOut={() => setHovered(false)}
                 onClick={() => setVisible(true)}>
                <line y1="-1.5" x2="59.0037" y2="-1.5" transform="matrix(1 0 0.0144674 0.999895 0.998169 3.33017)"
                      stroke="white" strokeWidth="3" style={hoverEffect("end")}/>
                <line y1="-1.5" x2="59" y2="-1.5" transform="matrix(1 0 0.0144674 0.999895 0.998169 20.5)"
                      stroke="white" strokeWidth="3" style={hoverEffect("middle")}/>
                <line y1="-1.5" x2="59.0037" y2="-1.5" transform="matrix(1 0 0.0144674 0.999895 0.998169 37.6698)"
                      stroke="white" strokeWidth="3" style={hoverEffect("end")}/>
            </svg>
        </div>
    );
}
