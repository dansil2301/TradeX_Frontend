import "./Eye.css"
import {useEffect, useRef, useState} from "react";
import {EyeMovementLogic} from "./EyeMovementLogic";

export function Eye() {
    const canvasRef = useRef(null);
    const [horizontalPos, setHorizontalPos] = useState(0);
    const [verticalPos, setVerticalPos] = useState(0);

    const handleMouseOnMove = (e, canvas) => {
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        const canvasRect = canvas.getBoundingClientRect();
        const canvasCenterX = canvasRect.left + canvas.width / 2;
        const canvasCenterY = canvasRect.top + canvas.height / 2;
        const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const lerp = (a, b, t) => a * (1 - t) + b * t;

        const tmpCoordX = mouseX < canvasCenterX ? -(canvasCenterX - mouseX) : mouseX - canvasCenterX;

        //set x from -canvas.width * 0.1 to canvas.width * 0.1
        const percentCoordX = tmpCoordX / canvasCenterX;
        const eyeMovementX = percentCoordX * canvas.width * 0.1; // 35 is an edge number that eye can move to
        setHorizontalPos(eyeMovementX);

        const tmpCoordY = mouseY < canvasCenterY ? canvasCenterY - mouseY : -(mouseY - canvasCenterY);

        //set x from -canvas.height * 0.06 to canvas.height * 0.06
        let percentCoordY = tmpCoordY < 0 ? tmpCoordY / (window.innerHeight - canvasCenterY) : tmpCoordY / canvasCenterY;
        percentCoordY = easeInOut(Math.abs(percentCoordY)) * Math.sign(percentCoordY);
        let eyeMovementY = lerp(verticalPos, percentCoordY * canvas.height * 0.06, 0.20);
        setVerticalPos(eyeMovementY);
    }

    const setCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const eyeImg = document.querySelector('.EyeImg');
        const eyeImgStyle = window.getComputedStyle(eyeImg);

        canvas.style.width = `${parseFloat(eyeImgStyle.width)}px`;
        canvas.style.height = `${parseFloat(eyeImgStyle.height)}px`;

        canvas.width = parseFloat(canvas.style.width) * devicePixelRatio;
        canvas.height = parseFloat(canvas.style.height) * devicePixelRatio;

        ctx.imageSmoothingEnabled = true;

        return {canvas, ctx};
    }

    useEffect(() => {
        const {canvas, ctx} = setCanvas();
        let eyeMovement = EyeMovementLogic.getInstance(canvas, ctx);

        const handleMouseMove = (e) => {
            handleMouseOnMove(e, canvas);
        };

        window.addEventListener('mousemove', handleMouseMove);

        eyeMovement.EyeMove(horizontalPos, verticalPos);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [horizontalPos, horizontalPos]);

    return (
        <div className="EyeContainer" >
            <canvas className="EyeImg" ref={canvasRef} />
        </div>
    )
}