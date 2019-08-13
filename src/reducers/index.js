import { combineReducers } from "redux";

import { userProfile } from "./UserProfile";
import { user } from "./Login";

export const Reducers = combineReducers({
  user,
  userProfile
});
