import { GET_FORM_ERROR } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_FORM_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
