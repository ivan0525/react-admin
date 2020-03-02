import React, { Component } from 'react'
import { Form, Input, Icon, Checkbox, Button, message } from 'antd'
import './Login.less'
import { login } from './../../api/login'
import { connect } from 'react-redux'
import { setCurrentUserToken } from '../../store/actions'
import { Redirect } from 'react-router-dom'
export interface Iprops {
  [key: string]: any
}
class Login extends Component<Iprops> {
  // 提交表单
  async handleSubmit(e: any) {
    e.preventDefault()
    try {
      const values = await this.props.form.validateFields()
      console.log(values)
      const { data } = await login(values)
      localStorage.setItem('user_token', data.token || '')
      console.log(data)
      message.success(data.message)
      this.props.history.replace('/')
    } catch (err) {
      console.log(err)
    }
  }

  // 校验密码
  checkPassword(rule: any, value: string, callback: any) {
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

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <div className="login-box">
          <Form onSubmit={this.handleSubmit.bind(this)}>
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
                rules: [{ validator: this.checkPassword }]
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
}

// Form.create是一个高阶函数，它执行后返回一个高阶组件（一个函数，接收一个组件，返回一个新的组件，用来拓展组件的功能）
// 新组件会向Form组件传递一个强大的对象属性：form
const WrappedLoginForm = Form.create({ name: 'login_form' })(Login)

const mapStateToProps = (state: any) => {
  console.log()
}

export default connect()(WrappedLoginForm)
