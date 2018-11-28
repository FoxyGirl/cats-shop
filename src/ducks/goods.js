import { createAction, createReducer } from 'redux-act'
import axios from 'axios'
import { API, GOODS_LIMIT } from '../service'

export const REDUCER = 'GOODS'
const NS = `${REDUCER}__`

const initialState = {
  items: [],
  page: 1,
  isGameOver: false,
  isLoading: false,
}

const reducer = createReducer({}, initialState)

const readRequest = createAction(`${NS}READ_REQUEST`)
reducer.on(readRequest, (state) => ({
  ...state,
  isLoading: true,
}))

const readSuccess = createAction(`${NS}READ_SUCCESS`)
reducer.on(readSuccess, (state, { items, page, isGameOver }) => {
  return {
    ...state,
    items: page === 1 ? items : [...state.items, ...items],
    page,
    isGameOver,
    isLoading: false,
  }
})

const readFailure = createAction(`${NS}READ_FAILURE`)
reducer.on(readFailure, (state) => ({
  ...state,
  isLoading: false,
}))

export const readGoods = ({ selectedCategoryIds, isLoadMore } = {}) => (dispatch, getState) => {
  const filter = (selectedCategoryIds || [])
    .reduce((accumulator, id) => {
      return [...accumulator, `categoryId=${id}`]
    }, [])
    .join('&')
  const state = getState()
  const page = isLoadMore ? state.goods.page + 1 : 1
  dispatch(readRequest())
  return axios
    .get(`${API}goods/?_page=${page}&_limit=${GOODS_LIMIT}&${filter}`)
    .then(({ status, statusText, data, headers }) => {
      if (status !== 200) {
        throw new Error(statusText)
      }
      const delta = (page - 1) * GOODS_LIMIT
      const total = parseInt(headers['x-total-count'], 10)
      const isGameOver = total - delta <= GOODS_LIMIT
      dispatch(readSuccess({ items: data, page, isGameOver }))
    })
    .catch((error) => {
      dispatch(readFailure())
      return Promise.reject(error)
    })
}

export default reducer
