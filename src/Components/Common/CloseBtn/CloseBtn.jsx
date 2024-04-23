export function CloseBtn({ onClick, isHovered, setHovered }) {
    return (
        <div>
            <svg width="30" height="30" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"
                 onMouseOver={() => setHovered(true)}
                 onMouseOut={() => setHovered(false)}
                 onClick={onClick}>
                <line style={{transition: "stroke 0.3s ease-in-out"}} y1="-1.5" x2="49.4975" y2="-1.5"
                      transform="matrix(0.707107 -0.707107 0.717263 0.696803 3.64087 38.139)"
                      stroke={isHovered ? "#666666" : "#969696"} strokeWidth="3"/>
                <line style={{transition: "stroke 0.3s ease-in-out"}} y1="-1.5" x2="49.4975" y2="-1.5"
                      transform="matrix(-0.707107 -0.707107 0.696803 -0.717263 37.6409 35.3002)"
                      stroke={isHovered ? "#666666" : "#969696"} strokeWidth="3"/>
            </svg>
        </div>
    );
}