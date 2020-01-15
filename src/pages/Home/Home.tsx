import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Redirect, Link } from 'react-router-dom'
import routerList, { Iroute } from '../../config/menuConfig'
import './Home.less'
const { Header, Sider, Content, Footer } = Layout
const { SubMenu, Item } = Menu

export default class Home extends Component {
  renderMenu(routes: Iroute[]) {
    return routes.map((route) => {
      if (route.children) {
        return (
          <SubMenu
            key={route.path}
            title={
              <span>
                <Icon type={route.icon} />
                {route.name}
              </span>
            }
          >
            {this.renderMenu(route.children)}
          </SubMenu>
        )
      } else {
        return (
          <Item key={route.path}>
            <Link to={route.path}>
              <Icon type={route.icon} />
              {route.name}
            </Link>
          </Item>
        )
      }
    })
  }

  render() {
    const token = localStorage.getItem('user_token')
    // 如果当前用户信息不可用
    if (!token) {
      // 自动跳转到登陆也
      return <Redirect to="/login" />
    }
    return (
      <Layout className="main-wrapper">
        <Sider>
          <Menu mode="inline">{this.renderMenu(routerList)}</Menu>
        </Sider>
        <Layout>
          <Header>header</Header>
          <Content>content</Content>
          <Footer>footer</Footer>
        </Layout>
      </Layout>
    )
  }
}
