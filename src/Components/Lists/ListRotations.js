import React from 'react'
import { useDispatch } from 'react-redux';
import {removeFlight} from "../../Store/action/index";

const ListRotations = ({ flights=[] }) => {
    const dispatch = useDispatch();

    return flights.map(obj => {
      
      return (
        <div className="rotFlightD posRel" key={obj.id}>
          <h4>Flight: {obj.id}</h4>
          <span className="flightMsgS posAbs remove-btn" onClick={()=>dispatch(removeFlight(obj))}>
            Remove
          </span>
          <div className="fDataInfoD posRel hidO">
            <div className="flex-row space-around">
              <span>
                <b>Origin:</b> {obj.origin}
              </span>
              <span>
                <b>Dest: </b> {obj.destination}
              </span>
            </div>
            <div className="flex-row space-around">
              <span>{obj.readable_departure}</span>
              <span>{obj.readable_arrival}</span>
            </div>
          </div>
        </div>
      );
    });
}

export default ListRotations
