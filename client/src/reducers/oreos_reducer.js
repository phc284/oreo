import { GET_OREOS } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_OREOS:
      return { ...state, oreos: action.payload };
    default:
      return state;
  }
}
