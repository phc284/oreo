import { HYDRATE_FORM } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case HYDRATE_FORM:
      return { ...state, oreo: action.payload.data };
    default:
      return state;
  }
}
