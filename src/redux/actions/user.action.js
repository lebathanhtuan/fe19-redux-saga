import { createAction } from '@reduxjs/toolkit'
import { USER_ACTION } from '../constants'

export const getUserInfoAction = createAction(USER_ACTION.GET_USER_INFO)
export const loginAction = createAction(USER_ACTION.LOGIN)
export const logoutAction = createAction(USER_ACTION.LOGOUT)
