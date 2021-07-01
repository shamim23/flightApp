import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const TOTAL_MINUTES_DAY = 1440;
const timeline = [
    {minute:1, status: "idle"},
]
const TimelineBar = () => {
    const {selectedRotation} = useSelector(({aircraftReducer})=>({...aircraftReducer}))
    const [timeline, setTimeline ]= useState([]);
    useEffect(()=>{
        if(selectedRotation && selectedRotation?.flights){
            const flights = selectedRotation?.flights || [];
            const len = flights.length;
            const timeList = Array(TOTAL_MINUTES_DAY).fill(0).map((_,i)=>({minute:i+1,status:"idle"}));
            if(len>0){
                flights.forEach(fl => {
                    const scheduledEnd = fl.arrivalMin-20; 
                    for (let index =  fl.departureMin; index <= scheduledEnd; index++) {
                        timeList[index] = {minute:index, status:"scheduled"}
                    }
                    for (let index = scheduledEnd+1; index <= fl.arrivalMin; index++) {
                        timeList[index] = {minute:index, status:"turnaround"}
                    }

                });
            }
            setTimeline(timeList)
        }
    },[selectedRotation])
    return (
        <div className="timeline-bar">
            <div className="bar">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>24:00</span>
            </div>
            <div className={"timeline"}>
                {
                    timeline.map((o,i)=><div key={i} className={`pin ${o.status}`}   />)
                }
            </div>
        </div>
    )
}

export default TimelineBar
