import {
  // LOGOUT,
  // SIGN_UP,

  USER_INFO,
  LOGOUT,
  LOGIN
} from "../actions/actionTypes";

const initial_state = {
  user: {},
  login: {}
};

export const userProfile = (state = initial_state, action) => {
  switch (action.type) {
    case USER_INFO:
      return { ...state, user: action.payload };
    case LOGIN:
      return { ...state, login: action.payload };
    case LOGOUT:
      return { ...state, user: initial_state };
    // case LOGOUT:
    // 	return { ...state, currentUser: {} };

    default:
      return state;
  }
};
