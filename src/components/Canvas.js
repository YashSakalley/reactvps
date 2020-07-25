import React, { useRef, useEffect, useState } from 'react'

export default function Canvas({ submit }) {

    const canvas = useRef(null)
    // const ctx = canvas.current.getContext("2d");
    let ctx;

    useEffect(() => {
        ctx = canvas.current.getContext("2d")
    }, [])

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n) {
            u8arr[n - 1] = bstr.charCodeAt(n - 1)
            n -= 1 // to make eslint happy
        }
        return new File([u8arr], filename, { type: mime })
    }

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
        let link = document.getElementById('canvas').toDataURL()
        let imgFile = dataURLtoFile(link, 'image_id.jpg')
        console.log('File', imgFile);
        submit(imgFile)
    }

    function clearSign() {
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    }

    return (
        <div className="" onClick={(e) => e.preventDefault()}>
            <div className="flex flex-col items-center">
                <canvas ref={canvas}
                    onMouseDown={startPosition}
                    onMouseUp={finishedPosition}
                    onMouseMove={draw}
                    id="canvas" className="bg-white opacity-100 border-2 border-black" width="500" height="500">
                </canvas>
            </div>
            <div className="text-center">
                <button className="p-4 bg-teal-500 text-lg text-white ml-8 mt-8" onClick={clearSign}>CLEAR</button>
                <button className="p-4 bg-gray-900 text-lg text-white ml-4 mt-8" onClick={onSave}>CONFIRM</button>
            </div>
        </div>
    )
}
