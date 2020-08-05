import React, { FC } from 'react'
import { Layout, Icon, Avatar, Menu, Dropdown } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import './index.less'
import { setCollapsedStatus, setCurrentUserToken } from '../../store/actions'
import { Link, useHistory } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import Util from './../../utils'
const { Header } = Layout

interface DecodeedData {
  _id: string
  username: string
  email: string
  createDate: string
  iat: number
  exp: number
}
const LayoutHeader: FC = () => {
  const history = useHistory()
  const token = Util.getCookie('auth')
  let username = ''
  if (token) {
    const decoded: DecodeedData = jwtDecode(token)
    username = decoded.username
  } else {
    history.replace('/login')
  }
  // 下拉菜单选项
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/me">个人中心</Link>
      </Menu.Item>
      <Menu.Item onClick={() => logout()}>退出</Menu.Item>
    </Menu>
  )

  const dispath = useDispatch()
  // 退出登陆
  const logout = () => {
    Util.removeCookie('auth')
    dispath(setCurrentUserToken(null))
    history.replace('/login')
    console.log('退出')
  }

  const collapsed = useSelector((state: any) => state.collapsed)
  return (
    <Header>
      <span className="header-trigger" onClick={() => dispath(setCollapsedStatus(!collapsed))}>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
      </span>
      <div className="header-content">
        <div className="header-right">
          <Avatar size={30} icon="user" />
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="javascript;">
              Hi, <b style={{ padding: '4px' }}>{username}</b>
              <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}

export default LayoutHeader
