import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import AddFormReducer from './addform_reducer';

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  AddForm: AddFormReducer,
  form: formReducer
});

export default rootReducer;
