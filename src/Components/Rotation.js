import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import ListRotations from "./Lists/ListRotations";
 
const Rotation = () => {
  const dispatch = useDispatch();
  const {loaded, loading, error, selectedRotation, selectedAircraft}= useSelector(({aircraftReducer})=>({...aircraftReducer}))
  useEffect(()=>{
    // FETCH FLIGHTS 
     
  },[]);


  let rotationList = <Spinner />;
  if (!loading && loaded && !error && !selectedRotation) {
    rotationList = (
      <h2 style={{ textAlign: "center", margin: "80px" }}>
        Please Select Aircraft
      </h2>
    );
  } else if (loaded && selectedRotation) {
    if (selectedRotation.flights.length > 0) {
      rotationList = <ListRotations flights={selectedRotation?.flights || []} /> 
    } else {
      rotationList = (
        <h2 style={{ textAlign: "center", margin: "80px" }}>
          Empty, there is no flight.!
        </h2>
      );
    }
  }

  return (
    <div className="posRel hidO centerD">
      <h1>Rotation {selectedAircraft}</h1>
      <div className="fHolderD cHolder autO">{rotationList}</div>
    </div>
  );
}

export default Rotation
