import React, { FC } from 'react'
import { Menu, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import routeList, { Iroute } from '../../../../config/menuConfig'
import './sideMenu.less'
const avatar = require('./../../../../assets/images/avatar.jpeg')
const { SubMenu, Item } = Menu
export interface Iprops {
  [key: string]: any
}
const SideMenu: FC = (props: Iprops) => {
  let parentPath = '/'
  const { collapsed } = props
  const { pathname } = props.location
  // 通过数组map方法递归渲染menu
  const renderMenu = (routes: Iroute[]) => {
    return routes.map((route) => {
      if (route.children) {
        // 找出当前打开的菜单的path，通过defaultOpenKeys属性来展开该菜单
        const matchedRoute = route.children.find((item) => {
          return pathname === item.path
        })
        if (matchedRoute) {
          parentPath = route.path
        }
        return (
          <SubMenu
            key={route.path}
            title={
              <span>
                <Icon type={route.icon} />
                <span>{route.name}</span>
              </span>
            }
          >
            {renderMenu(route.children)}
          </SubMenu>
        )
      } else {
        return (
          <Item key={route.path}>
            <Link to={route.path}>
              <Icon type={route.icon} />
              <span>{route.name}</span>
            </Link>
          </Item>
        )
      }
    })
  }
  const menuNodes = renderMenu(routeList)
  console.log(collapsed)
  return (
    <div className="side-menu">
      <Link to="/home">
        <div className="title">
          <img src={avatar} alt="logo" />
          {collapsed ? null : <h1>后台管理系统</h1>}
        </div>
      </Link>
      <Menu mode="inline" selectedKeys={[pathname]} defaultOpenKeys={[parentPath]}>
        {menuNodes}
      </Menu>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    collapsed: state.collapsed
  }
}
export default connect(mapStateToProps)(withRouter(SideMenu))
