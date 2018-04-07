import axios from 'axios';

export const CLOSE_ADDFORM = 'CLOSE_ADDFORM';
export const OPEN_ADDFORM = 'OPEN_ADDFORM';
export const GET_FORM_ERROR = 'GET_FORM_ERROR';
export const GET_OREOS = 'GET_OREOS';

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

export const getOreos = () => {
  const oreos = axios.get('/api/oreos');
  return {
    type: GET_OREOS,
    payload: oreos
  };
};
