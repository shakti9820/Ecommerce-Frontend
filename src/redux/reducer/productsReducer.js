// reducers/productsReducer.js
import { SET_PRODUCTS, SET_PRODUCTS_LOADING, SET_PRODUCTS_ERROR } from '../action/actionType';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        items: action.payload,
        error: null,
      };
    case SET_PRODUCTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
