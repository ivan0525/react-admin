import React, { Component } from 'react'
import { Form, Input, Icon, Checkbox, Button } from 'antd'
import './Login.less'
export interface Iprops {
  [key: string]: any
}
class Login extends Component<Iprops> {
  // 提交表单
  async handleSubmit (e: any) {
    e.preventDefault()
    const values = await this.props.form.validateFields()
    console.log(values)
  }

  // 校验密码
  checkPassword (rule: any, value: string, callback: any) {
    if (!value) {
      callback('请输入密码')
    } else if (value.length < 6) {
      callback('密码长度不能小于6位')
    } else if (value.length > 18) {
      callback('密码长度不能大于18位')
    }
    callback()
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <div className="login-box">
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, whitespace: true, message: '请输入用户名' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                  { min: 4, message: '用户名至少4位' },
                  { max: 12, message: '用户名至多12位' }
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('passowrd', {
                  rules: [
                    { validator: this.checkPassword }
                  ]
                })(
                  <Input
                    type="password"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="密码"
                  />
                )
              }
            </Form.Item>
            <div className="option-box">
              <Form.Item>
                <Checkbox>自动登录</Checkbox>
              </Form.Item>
              <Button type="link">忘记密码</Button>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
          </Button>
          </Form>
        </div>
      </div>
    )
  }
}

// Form.create是一个高阶函数，它执行后返回一个高阶组件（一个函数，接收一个组件，返回一个新的组件）
const WrappedLoginForm = Form.create({ name: 'login_form' })(Login)

export default WrappedLoginForm
