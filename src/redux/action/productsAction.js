// actions/productsActions.js
import { SET_PRODUCTS, SET_PRODUCTS_LOADING, SET_PRODUCTS_ERROR } from './actionType';

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const setProductsLoading = (isLoading) => ({
  type: SET_PRODUCTS_LOADING,
  payload: isLoading,
});

export const setProductsError = (error) => ({
  type: SET_PRODUCTS_ERROR,
  payload: error,
});
