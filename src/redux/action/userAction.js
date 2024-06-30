import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './actionType';

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (userData) => ({ type: LOGIN_SUCCESS, payload: userData });
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });