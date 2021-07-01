
import toast from 'react-hot-toast'

/*--- CASES ARE HERE DEFINED */
// UTILITY FUNCTION CALCULATE UTILIZATION

export const addUtilize = (flight, utilize) => { 
    const val = utilize + flight.totalPercent;
    if(val > 100){
        toast.error("Max Utilization is reached.")
    }
    return val;
};
export const removeUtilize = (flight, utilize) => {
    // console.log(typeof utilize, typeof (utilize - flight.totalPercent));
    return utilize - flight.totalPercent;
};
// VALIDATION FOR ADDING FLIGHT INTO ROTATION
export const isFlightValid = (flights = [], curFlight) => {
    let flightName = "";
    const s = curFlight.departureMin,
        f = curFlight.arrivalMin;
    const check = flights.every((obj) => {
        const a = obj.departureMin,
            b = obj.arrivalMin;
        if ((s < a && f < a) || (s > b && f > b)) return true;
        else {
            flightName = obj.id;
            return false
        };
    })
    if (!check) toast.error(`This Time Slot is already booked for flight: ${flightName}`)
    return check
}