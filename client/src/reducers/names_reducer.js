import { GET_NAMES } from "../actions";

export default function(state = { names: [""] }, action) {
  switch (action.type) {
    case GET_NAMES:
      return { ...state, names: action.payload.data };
    default:
      return state;
  }
}
