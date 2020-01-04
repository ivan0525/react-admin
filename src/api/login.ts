import request from 'axios'
export interface IloginForm {
  email: string
  password: string
}
export interface IloginResult {
  data: {
    status: string
    message: string
  }
}
export function login(data: IloginForm): Promise<IloginResult> {
  return request({
    url: '/api/users/login',
    method: 'POST',
    data
  })
}

export function test(): Promise<any> {
  return request({
    url: '/api/users/test',
    method: 'GET'
  })
}
