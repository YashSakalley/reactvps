import React from 'react'
import video from '../../../assets/animation2.mp4'

const Video = ({ start, mid, end }) => {
    const onTimeChangedHanlder = (e) => {
        let currentTime = e.target.currentTime;
        if (currentTime >= end - 1) {
            e.target.currentTime = mid;
        }
    }
    console.log('Start', start, 'end', end);
    return (
        <div>
            <video src={video} onTimeUpdate={onTimeChangedHanlder} autoPlay={true} className="w-full h-full" />
        </div>
    )
}

export default Video