import React, { FC } from 'react'
// import LeftNav from './LeftNav'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import LayoutHeader from './LayoutHeader/LayoutHeader'
import SideMenu from './SideMenu'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import './index.less'
const { Sider, Footer, Content } = Layout
const BasicLayout: FC = (props: any) => {
  const user = localStorage.getItem('user_token')
  const userInfo = user && jwtDecode(user)
  console.log(userInfo)
  // const { iat, exp} = userInfo
  // 如果当前用户信息不可用
  if (!user) {
    // 自动跳转到登陆页
    return <Redirect to="/login" />
  }
  console.log(props.collapsed)
  return (
    <Layout className="main-wrapper">
      <Sider trigger={null} collapsible collapsed={props.collapsed}>
        <SideMenu />
      </Sider>
      <Layout>
        <LayoutHeader />
        <Content></Content>
        <Footer>footer</Footer>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = (state: any) => {
  return {
    collapsed: state.collapsed,
    user: state.user
  }
}

export default connect(mapStateToProps)(BasicLayout)
