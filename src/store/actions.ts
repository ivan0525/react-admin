import { SET_COLLAPSED_STATUS } from './actionTypes'
export const setCollapsedStatus = (collapsed: boolean) => {
  return { type: SET_COLLAPSED_STATUS, payload: collapsed }
}
