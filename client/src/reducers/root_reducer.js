import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import AddFormReducer from './addform_reducer';
import ErrorReducer from './error_reducer';
import OreosReducer from './oreos_reducer';

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  addForm: AddFormReducer,
  error: ErrorReducer,
  oreos: OreosReducer,
  form: formReducer
});

export default rootReducer;
