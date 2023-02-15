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
      return newState;
    }
    case types.LOGIN_FAILURE: {
      return state;
    }
    default: {
      return state;
    }
  }
}
