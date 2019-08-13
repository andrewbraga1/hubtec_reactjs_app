import { IS_AUTH } from "../actions/actionTypes";

const initial_state = {
  isLoggedIn: false
};

export const user = (state = initial_state, action) => {
  switch (action.type) {
    case IS_AUTH:
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
};
