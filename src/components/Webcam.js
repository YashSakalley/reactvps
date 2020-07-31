import React, { useEffect, useState } from 'react'
import { useRef } from 'react';

export default function Webcam({ submit }) {
    const [canSubmit, setCanSubmit] = useState(false)
    const [file, setFile] = useState(null)

    const ctx = useRef(null)
    const pl = useRef(null)

    let canvas, context, player

    useEffect(() => {
        canvas = ctx.current;
        context = canvas.getContext('2d');
        player = pl.current;
    })

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

    // Draw the video frame to the canvas.
    const onCaptureClick = () => {
        let imgFile
        if (context) {
            console.log('Display');
            context.drawImage(player, 0, 0, canvas.width, canvas.height)
            imgFile = dataURLtoFile(canvas.toDataURL('image/jpeg'), 'image_id.jpg')
        }
        setCanSubmit(true)
        setFile(imgFile)
    }

    const onSubmit = async () => {
        console.log('Submitting', file);
        submit(file)
    }

    const constraints = {
        video: true
    };
    // Attach the video stream to the video element and autoplay.
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            if (player) {
                player.srcObject = stream;
            }
        });

    return (
        <div className="flex justify-center mt-8 z-50">
            <div>

                <video
                    ref={pl}
                    id="player"
                    autoPlay
                    className="bg-white shadow-xl p-2"></video>

                <button
                    onClick={onCaptureClick}
                    id="capture"
                    className="mt-4 bg-green-500 p-2 text-xl text-white">
                    Capture
                </button>

                <button
                    onClick={onSubmit}
                    className="mt-4 ml-4 bg-blue-500 p-2 text-xl text-white"
                    disabled={!canSubmit}>
                    CONFIRM
                </button>

            </div>

            <div>
                <canvas
                    ref={ctx}
                    id="canvas"
                    width="320"
                    height="240"
                    className="ml-5 bg-white p-2 shadow-xl"></canvas>
            </div>
        </div>
    )
}
