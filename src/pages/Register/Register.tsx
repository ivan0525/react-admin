import React, { FC } from 'react'
import { Form, Input, Icon } from 'antd'
import './Register.less'
const Register: FC<any> = (props) => {
  const handleSubmit = (e: any) => {}
  const { getFieldDecorator } = props.form
  return (
    <div className="register">
      <div className="register-box">
        <h3>注册</h3>
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
            {getFieldDecorator('email', {
              rules: [{ required: true, whitespace: true, message: '请输入邮箱' }]
            })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="邮箱"
              />
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

const WrappedRegisterForm = Form.create({ name: 'register_form' })(Register)

export default WrappedRegisterForm
