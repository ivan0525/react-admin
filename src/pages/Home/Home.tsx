import React, { Component } from 'react'
import { Layout, Icon } from 'antd'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCollapsedStatus } from '../../store/actions'
import jwtDecode from 'jwt-decode'
import SideMenu from './components/SideMenu'
import './Home.less'
const { Header, Sider, Content, Footer } = Layout
export interface Iprops {
  [key: string]: any
}

class Home extends Component<Iprops> {
  render() {
    const { collapsed, setCollapsedStatus, user } = this.props
    const userInfo = jwtDecode(user)
    // 如果当前用户信息不可用
    if (!user) {
      // 自动跳转到登陆也
      return <Redirect to="/login" />
    }
    return (
      <Layout className="main-wrapper">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <SideMenu />
        </Sider>
        <Layout>
          <Header>
            <span className="header-trigger" onClick={() => setCollapsedStatus(!collapsed)}>
              <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            </span>
          </Header>
          <Content>content</Content>
          <Footer>footer</Footer>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    collapsed: state.collapsed,
    user: state.user
  }
}

// const mapDispatchToProps = (dispatch: any) => ({
//   setCollapsedStatus: (collapsed: boolean) => dispatch(setCollapsedStatus(collapsed))
// })

const mapDispatchToProps = {
  setCollapsedStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
