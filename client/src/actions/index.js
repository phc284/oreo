export const CLOSE_ADDFORM = 'CLOSE_ADDFORM';
export const OPEN_ADDFORM = 'OPEN_ADDFORM';
export const GET_FORM_ERROR = 'GET_FORM_ERROR';

export const closeAddform = () => {
  return {
    type: CLOSE_ADDFORM,
    payload: false
  };
};

export const openAddform = () => {
  return {
    type: OPEN_ADDFORM,
    payload: true
  };
};
export const getFormError = error => {
  const errMsg = `You must provide a ${error}`;
  return {
    type: GET_FORM_ERROR,
    payload: errMsg
  };
};
