import React, { FC } from 'react'
import { Form, Input, Icon, Checkbox, Button, message } from 'antd'
import './Login.less'
import { login } from './../../api/login'
import Util from '../../utils'
import { useHistory, useLocation } from 'react-router-dom'

const Login: FC<any> = (props) => {
  const history = useHistory()
  const location = useLocation()
  if (Util.getCookie('auth')) {
    history.replace('/')
  }
  // 提交表单
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const values = await props.form.validateFields()
      const { data } = await login(values)
      // 将token存入cookie，有效期七天
      Util.setCookie('auth', data.token, 7)
      message.success(data.message)
      history.replace('/')
    } catch (err) {
      console.log(err)
    }
  }

  // 校验密码
  const checkPassword = (rule: any, value: string, callback: any) => {
    if (!value) {
      callback('请输入密码')
    } else if (value.length < 6) {
      callback('密码长度不能小于6位')
    } else if (value.length > 18) {
      callback('密码长度不能大于18位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback()
    }
  }
  const { getFieldDecorator } = props.form
  return (
    <div className="login">
      <div className="login-box">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, whitespace: true, message: '请输入用户名' }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ validator: checkPassword }]
            })(
              <Input
                type="password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="密码"
              />
            )}
          </Form.Item>
          <div className="option-box">
            <Form.Item>
              <Checkbox>自动登录</Checkbox>
            </Form.Item>
            <Button type="link">忘记密码</Button>
          </div>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form>
      </div>
    </div>
  )
}

// Form.create是一个高阶函数，它执行后返回一个高阶组件（一个函数，接收一个组件，返回一个新的组件，用来拓展组件的功能）
// 新组件会向Form组件传递一个强大的对象属性：form
const WrappedLoginForm = Form.create({ name: 'login_form' })(Login)

export default WrappedLoginForm
