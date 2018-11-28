import { createAction, createReducer } from 'redux-act'
// import axios from "axios";
// import { API } from "../service";

export const REDUCER = 'BASKET'
const NS = `${REDUCER}__`

const initialState = {
  items: [],
  isLoading: false,
}

const reducer = createReducer({}, initialState)

const readRequest = createAction(`${NS}READ_REQUEST`)
reducer.on(readRequest, (state) => ({
  ...state,
  isLoading: true,
}))

const readSuccess = createAction(`${NS}READ_SUCCESS`)
reducer.on(readSuccess, (state, items) => ({
  ...state,
  items: [...items],
  isLoading: false,
}))

const readFailure = createAction(`${NS}READ_FAILURE`)
reducer.on(readFailure, (state) => ({
  ...state,
  isLoading: false,
}))

const reset = createAction(`${NS}RESET`)
reducer.on(reset, () => ({
  ...initialState,
}))

export const readBasket = () => (dispatch) => {
  dispatch(readRequest())
  try {
    const items = JSON.parse(localStorage.getItem('basket')) || []
    dispatch(readSuccess(items))
    return Promise.resolve()
  } catch (error) {
    dispatch(readFailure())
    return Promise.reject(error)
  }
}

export const addToBasket = (item) => (dispatch, getState) => {
  dispatch(readRequest())
  try {
    const state = getState()
    const items = [...state.basket.items, item]
    localStorage.setItem('basket', JSON.stringify(items))
    dispatch(readSuccess(items))
    return Promise.resolve()
  } catch (error) {
    dispatch(readFailure())
    return Promise.reject(error)
  }
}

export const sendOrder = () => (dispatch, getState) => {
  const state = getState()
  const items = state.basket.items
  try {
    localStorage.clear()
    dispatch(reset())
  } finally {
    return Promise.resolve(items)
  }
}

export default reducer
