import { SET_COLLAPSED_STATUS, SET_CURRENT_USER_TOKEN } from './actionTypes'

// 菜单是否折叠
export const setCollapsedStatus = (collapsed: boolean) => {
  console.log(collapsed)
  return { type: SET_COLLAPSED_STATUS, payload: collapsed }
}

// 当前用户的token
export const setCurrentUserToken = (user: string) => {
  return { type: SET_CURRENT_USER_TOKEN, payload: user }
}
