import React, { FC } from 'react'
import { Layout, Icon } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import './index.less'
import { setCollapsedStatus } from '../../store/actions'
const { Header } = Layout

const LayoutHeader: FC = () => {
  const collapsed = useSelector((state: any) => state.collapsed)
  const dispath = useDispatch()
  return (
    <Header>
      <span className="header-trigger" onClick={() => dispath(setCollapsedStatus(!collapsed))}>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
      </span>
    </Header>
  )
}

export default LayoutHeader
