import * as types from '../types';

const initalState = {
  isLoggedIn: false,
  token: '',
  user: {},
  isLoading: false,
};

// eslint-disable-next-line default-param-last
export default function reducer(state = { initalState }, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...initalState };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      newState.isLoading = false;
      return newState;
    }
    case types.LOGIN_REQUEST: {
      const newState = { ...initalState };
      newState.isLoading = true;
      return newState;
    }
    case types.LOGIN_FAILURE: {
      const newState = { ...initalState };
      return newState;
    }
    default: {
      return state;
    }
  }
}
