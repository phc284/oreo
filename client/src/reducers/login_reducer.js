import { LOGIN_USER, LOGOUT_USER } from '../actions';

export default function(state = { user: null }, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.user };
    case LOGOUT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}
