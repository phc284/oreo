import { OPEN_EDITFORM, CLOSE_EDITFORM } from '../actions';

export default function(state = { editForm: false }, action) {
  switch (action.type) {
    case OPEN_EDITFORM:
      return { ...state, editForm: action.payload };
    case CLOSE_EDITFORM:
      return { ...state, editForm: action.payload };
    default:
      return state;
  }
}
