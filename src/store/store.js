import { createStore } from 'redux';

const UPDATE_USERNAME = 'UPDATE_USERNAME';

export const updateUsername = (newUsername) => ({
  type: UPDATE_USERNAME,
  payload: newUsername,
});

const initialState = {
  username: "",
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USERNAME:
      return { ...state, username: action.payload };
    default:
      return state;
  }
};


const store = createStore(reducer);

export default store;
