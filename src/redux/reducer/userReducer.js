import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../action/actionType';

const initialState = {
  loading: false,
  userData: null,
  error: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, userData: action.payload, error: '' };
    case LOGIN_FAILURE:
      return { ...state, loading: false, userData: null, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
