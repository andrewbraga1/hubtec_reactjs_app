import { IS_AUTH } from "./actionTypes";

const setUser = param => {
  return {
    type: IS_AUTH,
    payload: param
  };
};

export { setUser };
