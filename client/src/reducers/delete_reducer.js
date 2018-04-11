import { OPEN_DELETE, CLOSE_DELETE } from '../actions';

export default function(state = { deleteModal: false }, action) {
  switch (action.type) {
    case OPEN_DELETE:
      return { ...state, deleteModal: action.payload, id: action.id };
    case CLOSE_DELETE:
      return { ...state, deleteModal: action.payload };
    default:
      return state;
  }
}
