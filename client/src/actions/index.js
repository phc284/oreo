export const CLOSE_ADDFORM = 'CLOSE_ADDFORM';
export const OPEN_ADDFORM = 'OPEN_ADDFORM';

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
