import * as actionTypes from "../action/actionTypes";
 
import toast from 'react-hot-toast'
import { addUtilize, isFlightValid, removeUtilize} from "../../Utils"
const initialState = {
  loaded: false,
  loading: false,
  error: null,
  data: null,
  selectedAircraft: null,
  selectedRotation: null,
  test: null
};

//TODO: this is main reducer.
const aircraftReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.INIT_AIRCRAFT:
      return initAircraft(state, payload);

    case actionTypes.FETCH_AIRCRAFT_SUCCESS:
      return aircraftSuccess(state, payload);

    case actionTypes.FETCH_AIRCRAFT_FAIL:
      return aircraftFail(state, payload);

    case actionTypes.ADD_FLIGHT:
      return addFlight(state, payload);

    case actionTypes.REMOVE_FLIGHT:
      return removeFlight(state, payload);

    case actionTypes.INIT_ROTATION:
      return initRotation(state, payload);

    default:
      return state;
  }
};



const initAircraft = (state) => {
  return {
    ...state,
    loading: true
  };
};

const initRotation = (state, payload) => {
  const rotationObj = {
    id: payload.date,
    flights: [],
    utilization: 0.0
  };
  //# DE-STRUCTURIZE CURRENT AIRCRAFT
  const currentAircraft = state.data.find(element => element.ident === payload.ident);
  // console.log("58", currentAircraft);
  const { rotationByDate } = currentAircraft;
  let updatedAircraft = { ...currentAircraft };
  let updateRotations = [...rotationByDate];

  //# DE-STRUCTURIZE CURRENT ROTATION BY DATE
  let currentRotation = updateRotations.find(element => {
    return element.id === payload.date;
  });

  //# HERE IS MAIN LOGIC
  if (!currentRotation) {
    updateRotations.push(rotationObj);
    currentRotation = rotationObj;
  }

  const aircraftList = state.data.filter(element => {
    return element.ident !== payload.ident;
  });
  aircraftList.push(
    Object.assign(updatedAircraft, { rotationByDate: updateRotations })
  );

  return {
    ...state,
    data: aircraftList,
    selectedAircraft: payload.ident,
    selectedRotation: currentRotation
  };
};

//---------------------------------------------------------------------------------
const aircraftSuccess = (state, payload) => {
  return {
    ...state,
    loading: false,
    loaded: true,
    data: payload.data
  };
};
const aircraftFail = (state, payload) => {
  return {
    ...state,
    loaded: false,
    loading: false,
    error: payload.error
  };
};

const addFlight = (state, { flight }) => {
  if (!state.selectedRotation) {
    toast.error("Please, First Select Aircraft.!");
    return state;
  // } else if (addUtilize(flight, state.selectedRotation.utilization) <= 100) {
  } else if ( isFlightValid(state.selectedRotation.flights, flight) && addUtilize(flight, state.selectedRotation.utilization) <= 100) {
    const updateSelectedRotation = { ...state.selectedRotation };

    const checkFlight = updateSelectedRotation.flights.find(element => {
      return element.id === flight.id;
    });
    if (checkFlight) {
      toast.error("This Flight already Added into Rotation..!");
      return state;
    } else {
      // HERE FLIGHT PUSH
      updateSelectedRotation.flights = [...updateSelectedRotation.flights ,flight].sort((a,b)=>a.departuretime-b.departuretime);
      const updatedAircraft = state.data.find(element => {
        return element.ident === state.selectedAircraft;
      });
      const { rotationByDate } = updatedAircraft;
      let rotations = rotationByDate.filter(element => {
        return element.id !== state.selectedRotation.id;
      });
      updateSelectedRotation.utilization = addUtilize(
        flight,
        updateSelectedRotation.utilization
      );
      // HERE ROTATION PUSH
      rotations.push(updateSelectedRotation);
      // updatedAircraft.rotationByDate = [...rotations];
      // HERE AIRCRAFT PUSH
      const aircraftList = state.data.filter(element => {
        return element.ident !== state.selectedAircraft;
      });
      aircraftList.push(
        Object.assign(updatedAircraft, { rotationByDate: rotations })
      );

      return {
        ...state,
        data: aircraftList,
        selectedRotation: updateSelectedRotation
      };
    }
  } else {
    return state;
  }
};

export const removeFlight = (state, { flight }) => {
  const updateSelectedRotation = { ...state.selectedRotation };
  let updateFlights = updateSelectedRotation.flights.filter(element => {
    return element.id !== flight.id;
  });
  updateSelectedRotation.flights = [...updateFlights];

  const updatedAircraft = state.data.find(element => {
    return element.ident === state.selectedAircraft;
  });
  const { rotationByDate } = updatedAircraft;
  let rotations = rotationByDate.filter(element => {
    return element.id !== state.selectedRotation.id;
  });
  updateSelectedRotation.utilization = removeUtilize(
    flight,
    updateSelectedRotation.utilization
  );
  // HERE ROTATION PUSH
  rotations.push(updateSelectedRotation);
  // updatedAircraft.rotationByDate = [...rotations];
  // HERE AIRCRAFT PUSH
  const aircraftList = state.data.filter(element => {
    return element.ident !== state.selectedAircraft;
  });
  aircraftList.push(
    Object.assign(updatedAircraft, { rotationByDate: rotations })
  );

  return {
    ...state,
    data: aircraftList,
    selectedRotation: updateSelectedRotation
  };
};

export default aircraftReducer;
