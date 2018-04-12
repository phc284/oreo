import axios from "axios";

export const CLOSE_ADDFORM = "CLOSE_ADDFORM";
export const OPEN_ADDFORM = "OPEN_ADDFORM";
export const CLOSE_EDITFORM = "CLOSE_EDITFORM";
export const OPEN_EDITFORM = "OPEN_EDITFORM";
export const CLOSE_DELETE = "CLOSE_DELETE";
export const OPEN_DELETE = "OPEN_DELETE";
export const GET_FORM_ERROR = "GET_FORM_ERROR";
export const GET_OREOS = "GET_OREOS";
export const GET_FILTERED_OREOS = "GET_FILTERED_OREOS";
export const HYDRATE_FORM = "HYDRATE_FORM";
export const GET_NAMES = "GET_NAMES";

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

export const closeEditform = () => {
  return {
    type: CLOSE_EDITFORM,
    payload: false
  };
};

export const openEditform = () => {
  return {
    type: OPEN_EDITFORM,
    payload: true
  };
};
export const closeDeleteModal = () => {
  return {
    type: CLOSE_DELETE,
    payload: false
  };
};

export const openDeleteModal = id => {
  return {
    type: OPEN_DELETE,
    payload: true,
    id
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
  const oreos = axios.get("/api/oreos");
  return {
    type: GET_OREOS,
    payload: oreos
  };
};

//hydrate the form
export const hydrateForm = id => {
  const oreo = axios.get(`/api/add/${id}`);
  return {
    type: HYDRATE_FORM,
    payload: oreo
  };
};

export const getFilteredOreos = filter => {
  const oreos = axios.get(`/api/oreos/${filter}`);
  return {
    type: GET_FILTERED_OREOS,
    payload: oreos
  };
};

export const getNames = query => {
  const names = axios.get("/api/names");
  return {
    type: GET_NAMES,
    payload: names
  };
};
