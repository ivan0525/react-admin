import React, { FC } from 'react'
import LeftNav from './LeftNav'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
const BasicLayout: FC = (props) => {
  const user = localStorage.getItem('user_token')
  const userInfo = user && jwtDecode(user)
  console.log(userInfo)
  // 如果当前用户信息不可用
  if (!user) {
    // 自动跳转到登陆页
    return <Redirect to="/login" />
  }
  return (
    <>
      <LeftNav />
    </>
  )
}

export default connect()(BasicLayout)
