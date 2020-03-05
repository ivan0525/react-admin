import React, { FC } from 'react'
import { Layout, Icon, Avatar, Menu, Dropdown } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import './index.less'
import { setCollapsedStatus } from '../../store/actions'
import { Link, useHistory } from 'react-router-dom'
const { Header } = Layout

const LayoutHeader: FC = () => {
  const history = useHistory()
  // const location = useLocation()

  // 下拉菜单选项
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/me">个人中心</Link>
      </Menu.Item>
      <Menu.Item onClick={() => logout()}>退出</Menu.Item>
    </Menu>
  )

  // 退出登陆
  const logout = () => {
    document.cookie = ''
    history.replace('/login')
    console.log('退出')
  }

  const collapsed = useSelector((state: any) => state.collapsed)
  const dispath = useDispatch()
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
              Hi
              <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}

export default LayoutHeader
