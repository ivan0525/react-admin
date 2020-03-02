import { combineReducers } from 'redux'
import { SET_COLLAPSED_STATUS, SET_CURRENT_USER_TOKEN } from './actionTypes'
const initialState = {
  collapsed: false,
  user: localStorage.getItem('user_token')
}

function collapsed(state = initialState.collapsed, action: any) {
  switch (action.type) {
    case SET_COLLAPSED_STATUS:
      return action.payload
    default:
      return state
  }
}

function user(state = initialState.user, action: any) {
  switch (action.type) {
    case SET_CURRENT_USER_TOKEN:
      return action.payload
    default:
      return state
  }
}

const reducer = combineReducers({
  collapsed,
  user
})

export default reducer
