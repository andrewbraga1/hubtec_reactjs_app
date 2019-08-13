import { USER_INFO, LOGOUT, LOGIN } from "./actionTypes";

const userInfo = param => {
  return {
    type: USER_INFO,
    payload: param
  };
};

const login = param => {
  return {
    type: LOGIN,
    payload: param
  };
};

const logOut = param => {
  return {
    type: LOGOUT,
    payload: param
  };
};

export { userInfo, logOut, login };
