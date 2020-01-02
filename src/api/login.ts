import Mockjs from 'mockjs'
export interface IloginForm {
  username: string
  password: string
}
export interface IloginResult {
  data: {
    status: string
    message: string
  }
}
export function login({ username, password }: IloginForm): Promise<IloginResult> {
  let data: any
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === '123456') {
        data = Mockjs.mock({
          data: {
            status: 'success',
            message: '登录成功'
          }
        })
        resolve(data)
      } else {
        data = Mockjs.mock({
          data: {
            status: 'error',
            message: '账号或密码错误'
          }
        })
        reject(data)
      }
    }, 1000)
  })
}
