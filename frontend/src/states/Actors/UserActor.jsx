import { USER_LOGGED_IN } from "../Contants/UserConstant";

export const userActor = (user) => async (dispatch) => {
  dispatch({ type: USER_LOGGED_IN, payload: user });
};
