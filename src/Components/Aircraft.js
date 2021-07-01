import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import Spinner from "./Spinner";
import ListAircraft from "./Lists/ListAircraft"; 
import * as actionCreators from "../Store/action/index";

const Aircraft = ({date}) => {
  const dispatch = useDispatch();
  const {loaded, loading, error, data:aircrafts, selectedAircraft, selectedRotation}= useSelector(({aircraftReducer})=>({...aircraftReducer}))
  useEffect(()=>{
    // FETCH AIRCRAFT
    dispatch(actionCreators.initAircraftAsync())
  },[]);
  
 
   

  let aircraftList = <Spinner />;
  if (loaded && !loading && !error && aircrafts) {
    aircraftList = <ListAircraft {...{aircrafts,selectedAircraft, selectedRotation,date}} />;
  } else if (error && !loading) {
    aircraftList = <p>There is something error.</p>;
  }

  return (
    <div className="posRel hidO leftD">
      <h1>Aircrafts</h1>
      <div className="fHolderD cHolder autO">
        {aircraftList}
      </div>
    </div>
  );
}

export default Aircraft