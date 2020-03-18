import request from '../http'

export interface IloginForm {
  email: string
  password: string
}

export interface IloginResult {
  data: {
    status: string
    message: string
    token: string
  }
}

// 登陆接口
export function login(data: IloginForm): Promise<IloginResult> {
  return request({
    url: '/api/user/login',
    method: 'POST',
    data
  })
}

// 获取当前用户
export function getUserInfoById(params: { id: string }): Promise<any> {
  return request({
    url: '/api/user/getUserInfoById',
    method: 'GET',
    params
  })
}

export function test(): Promise<IloginResult> {
  return request({
    url: '/api/user/test',
    method: 'GET'
  })
}
