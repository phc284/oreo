import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import AddFormReducer from './addform_reducer';
import EditFormReducer from './editform_reducer';
import ErrorReducer from './error_reducer';
import OreosReducer from './oreos_reducer';
import HydrateReducer from './hydrate_reducer';
import DeleteReducer from './delete_reducer';
import NamesReducer from './names_reducer';
import FlashMessageReducer from './flashmessage_reducer';
import LoginReducer from './login_reducer';

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  addForm: AddFormReducer,
  editForm: EditFormReducer,
  deleteModal: DeleteReducer,
  flashMessages: FlashMessageReducer,
  names: NamesReducer,
  login: LoginReducer,
  hydrate: HydrateReducer,
  error: ErrorReducer,
  oreos: OreosReducer,
  form: formReducer
});

export default rootReducer;
