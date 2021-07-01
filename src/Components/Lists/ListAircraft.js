import React from 'react'
import { useDispatch } from 'react-redux';
import { initRotation } from "../../Store/action/index";
const ListAircraft = ({ aircrafts = [], selectedRotation, selectedAircraft, date }) => {
    const dispatch = useDispatch();
    return aircrafts.map((obj) => {
        return (
            <div
                className={`acD posRel hidO ${obj.ident === selectedAircraft && " selected"}`}
                key={obj.ident + obj.base}
                onClick={() => dispatch(initRotation(obj.ident, date))}
            >
                {<h2>{obj.ident}</h2>}
                <span>
                    Utilization{" "}
                    {selectedRotation ? (
                        <b>{selectedRotation.utilization.toFixed(2)}%</b>
                    ) : (
                        "none"
                    )}
                </span>
            </div>
        );
    });
}

export default ListAircraft
