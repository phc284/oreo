import { GET_OREOS, GET_FILTERED_OREOS } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_OREOS:
      return { ...state, oreos: action.payload.data };
    case GET_FILTERED_OREOS:
      return { ...state, oreos: action.payload.data };
    default:
      return state;
  }
}
