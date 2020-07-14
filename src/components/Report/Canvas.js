import React, { useRef, useEffect } from 'react'

export default function Canvas() {
    const canvas = useRef(null)
    // const ctx = canvas.current.getContext("2d");
    let ctx;

    useEffect(() => {
        ctx = canvas.current.getContext("2d")
    }, [])

    let painting = false;
    function startPosition(e) {
        painting = true;
        draw(e);
    }
    function finishedPosition() {
        painting = false;
        ctx.beginPath();
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function draw(e) {
        if (!painting) return;
        var mousePos = getMousePos(canvas.current, e);

        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        ctx.moveTo(mousePos.x, mousePos.y);
    }

    function onSave() {
        var link = document.createElement('a');
        console.log(link);
        link.download = 'filename.png';
        link.href = document.getElementById('canvas').toDataURL()
        console.log(link.click);
        link.click();
    }

    function clearSign() {
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    }

    return (
        <div className="" onClick={(e) => e.preventDefault()}>
            <div className="">
                <canvas ref={canvas}
                    onMouseDown={startPosition}
                    onMouseUp={finishedPosition}
                    onMouseMove={draw}
                    id="canvas" className="bg-white opacity-100 border-2 border-black" width="500" height="500">
                </canvas>
            </div>
            <button className="p-4 bg-teal-500 text-lg text-white ml-8 mt-8" onClick={clearSign}>CLEAR</button>
            <button className="p-4 bg-gray-900 text-lg text-white ml-4 mt-8" onClick={onSave}>SAVE</button>
        </div>
    )
}
