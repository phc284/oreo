import { OPEN_ADDFORM, CLOSE_ADDFORM } from '../actions';

export default function(state = { addForm: false }, action) {
  switch (action.type) {
    case OPEN_ADDFORM:
      return { ...state, addForm: action.payload };
    case CLOSE_ADDFORM:
      return { ...state, addForm: action.payload };
    default:
      return state;
  }
}
