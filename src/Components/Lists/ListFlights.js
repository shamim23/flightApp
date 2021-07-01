import React from 'react'
import { useDispatch } from 'react-redux';
import {addFlight} from "../../Store/action/index";

const ListFlights = ({ flights=[] }) => {
    const dispatch = useDispatch();

    return flights.map(obj => {
        return (
          <button
            className={`btnFlight btn_${obj.id}`}
            key={obj.id}
            onClick={()=> dispatch(addFlight(obj))}
          >
            <div className="fDataInfoD margin-nested">
              <h4>{obj.id}</h4>
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
          </button>
        );
    });
}

export default ListFlights
