import React, { Component } from 'react'
import { Layout, Icon } from 'antd'
import { Redirect, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCollapsedStatus } from '../../store/actions'
import jwtDecode from 'jwt-decode'
import SideMenu from './components/SideMenu'
import './index.less'
const { Header, Sider, Content, Footer } = Layout
export interface Iprops {
  [key: string]: any
}

class LeftNav extends Component<Iprops> {
  render() {
    const { collapsed, setCollapsedStatus } = this.props

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
          <Content>{/* <Switch>
            </Switch> */}</Content>
          <Footer>footer</Footer>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => {
  console.log(state)
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

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav)
