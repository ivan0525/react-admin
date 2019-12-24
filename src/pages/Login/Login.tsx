import React, { Component } from 'react'
import { Form, Input, Checkbox, Button } from 'antd'
import './Login.less'
export default class Login extends Component {
  render () {
    return (
      <div className="login">
        <div className="login-box">
          <Form>
            <Form.Item>
              <Input placeholder="用户名" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="密码" />
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
