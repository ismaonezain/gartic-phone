import React, { useRef, useState, useEffect } from 'react';

const DrawingCanvas = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [timer, setTimer] = useState(120);
    
    useEffect(() => {
        // Timer countdown
        const interval = setInterval(() => {
            setTimer((prev) => Math.max(prev - 1, 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    
    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };
    
    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.stroke();
    };
    
    const endDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.closePath();
    };
    
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    
    return (
        <div>
            <canvas
                ref={canvasRef}
                width={500}
                height={500}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
                style={{border: '1px solid #000'}}
            />
            <div>
                <input type='color' value={color} onChange={(e) => setColor(e.target.value)} />
                <input type='range' min='1' max='100' value={brushSize} onChange={(e) => setBrushSize(e.target.value)} />
                <button onClick={clearCanvas}>Clear</button>
                <div>Time Remaining: {timer} seconds</div>
            </div>
        </div>
    );
};

export default DrawingCanvas;