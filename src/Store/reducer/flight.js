import * as actionTypes from "../action/actionTypes"; 

const initialState = {
  loaded: false,
  loading: false,
  error: null,
  data: null
};

//TODO: this is main reducer.
const flightReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.INIT_FLIGHT:
      return initFlight(state, payload);

    case actionTypes.FETCH_FLIGHT_SUCCESS:
      return flightSuccess(state, payload);

    case actionTypes.FETCH_FLIGHT_FAIL:
      return flightFail(state, payload);

    default:
      return state;
  }
};
 

/*--- CASES ARE HERE DEFINED */

// Case createFlight
const initFlight = (state, payload) => {
  return {
    ...state,
    loading: true
  };
};
const flightSuccess = (state, payload) => {
  return {
    ...state,
    loading: false,
    loaded: true,
    data: payload.data
  };
};
const flightFail = (state, payload) => {
  return {
    ...state,
    loaded: false,
    loading: false,
    error: payload.error
  };
};


export default flightReducer;
