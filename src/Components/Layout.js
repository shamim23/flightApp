import React, { Component, useState } from "react";
import Flights from "./Flights";
import Aircraft from "./Aircraft";
import Rotation from "./Rotation";
import moment from "moment";
import { connect, useDispatch, useSelector } from "react-redux";
import * as actionCreators from "../Store/action/index";
import toast from "react-hot-toast";
import TimelineBar from "./TimelineBar";


const Layout = () => {
  const [date,setDate]=useState(()=>moment().format().substr(0,10));
  const dispatch = useDispatch();
  const {selectedAircraft,loaded}=useSelector(({aircraftReducer})=>({...aircraftReducer}));

  const onChange = ({target:{value}}) => {
    const mm = moment(new Date(value)); 
    const formatedDate = mm.format().substr(0,10);
    setDate(mm.format());
    if (loaded && selectedAircraft) { 
      dispatch(actionCreators.initRotation(selectedAircraft, formatedDate));
    } else {
      toast.error("Please First Select Aircraft");
    }
  };
  return (
    <div>
      <div className="mainD posRel hidO">
        <div
          className="posRel hidO topD "
          style={{
            textAlign: "center",
            margin: "20px"
          }}
        >
          <h2>Select Date For Rotation</h2>
          <input 
            className="date-selector"
            type="date"  
            name="dateSelector" 
            defaultValue={moment().format().substr(0,10)}
            onChange={onChange}
            max={moment().add(1, 'days').format().substr(0,10)}
          />
        </div>
        <div className="posRel hidO bottomD container">
          <Aircraft date={date} />
          <Rotation date={date} />
          <Flights />
          <TimelineBar/>
        </div>
      </div>
    </div>
  )
}

export default Layout