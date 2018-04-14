import { ADD_FLASH_MESSAGE, RESET_FLASH_MESSAGE } from '../actions';
import shortid from 'shortid';

export default function(state = { message: {}, flashState: false }, action) {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return {
        ...state,
        message: {
          id: shortid.generate(),
          type: action.payload.type,
          text: action.payload.text
        },
        flashState: true
      };
    case RESET_FLASH_MESSAGE:
      return {
        ...state,
        message: {},
        flashState: false
      };
    default:
      return state;
  }
}
