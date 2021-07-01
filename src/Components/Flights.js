import React, { useEffect } from "react";
import { useDispatch,useSelector  } from "react-redux";
import Spinner from "./Spinner";
import { initFlightAsync } from "../Store/action/index"; 
import ListFlights from "./Lists/ListFlights";

const Flights = () => {
  const dispatch = useDispatch();
  const {loaded, loading, error, data:flights}= useSelector(({flightReducer})=>({...flightReducer}))
  useEffect(()=>{
    // FETCH FLIGHTS 
    if (!loaded) {
      dispatch(initFlightAsync())
    }
  },[]);
  

  let rednerFlights = <Spinner />;
  if (loaded && !loading && !error && flights) {
    rednerFlights = <ListFlights flights={flights} />;
  } else if (error && !loading) {
    rednerFlights = <p>There is something error.</p>;
  }

  return (
      <div className="posRel hidO rightD">
        <h1>Flights</h1>
        <div className="fHolderD cHolder autO">{rednerFlights}</div>
      </div>
  )
}

export default Flights
