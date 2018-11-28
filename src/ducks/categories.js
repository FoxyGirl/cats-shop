import { createAction, createReducer } from 'redux-act'
import axios from 'axios'
import { API } from '../service'

export const REDUCER = 'CATEGORIES'
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
reducer.on(readSuccess, (state, items) => {
  return {
    ...state,
    items: [...items],
    isLoading: false,
  }
})

const readFailure = createAction(`${NS}READ_FAILURE`)
reducer.on(readFailure, (state) => ({
  ...state,
  isLoading: false,
}))

export const readCategories = () => (dispatch) => {
  dispatch(readRequest())
  return axios
    .get(`${API}categories/`)
    .then(({ status, statusText, data }) => {
      if (status !== 200) {
        throw new Error(statusText)
      }
      dispatch(readSuccess(data))
    })
    .catch((error) => {
      dispatch(readFailure())
      return Promise.reject(error)
    })
}

export default reducer
