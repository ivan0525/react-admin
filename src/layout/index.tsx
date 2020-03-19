import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import LayoutHeader from './LayoutHeader/LayoutHeader'
import SideMenu from './SideMenu'
import Me from '../pages/me/Me'
import { Route, useLocation, useHistory, Switch, Link, Redirect } from 'react-router-dom'
import { breadcrumbNameMap } from '../config/menuConfig'
import { Layout, Breadcrumb } from 'antd'
import './index.less'
import Home from '../pages/Home/Home'
import PublishArtical from '../pages/ArticleManagement/PublishArtical'
import { test } from './../api/login'
import Util from './../utils'
const { Sider, Footer, Content } = Layout

const BasicLayout = () => {
  const location = useLocation()
  const history = useHistory()
  // 如果token过期，就跳转到登陆页
  const token = Util.getCookie('auth')
  useEffect(() => {
    const getTest = async () => {
      try {
        const { data } = await test()
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getTest()
  }, [])

  // 用filter过滤掉空串（第一个‘/’会分出一个空串）
  const pathArr = location.pathname.split('/').filter((i) => i)
  const breadcrumbArr = pathArr.map((_, index: number) => {
    const url = `/${pathArr.slice(0, index + 1).join('/')}`
    return (
      <Breadcrumb.Item key={url}>
        {url.lastIndexOf('/') === 0 ? (
          breadcrumbNameMap[url]
        ) : (
          <Link to={url}>{breadcrumbNameMap[url]}</Link>
        )}
      </Breadcrumb.Item>
    )
  })
  if (location.pathname === '/') {
    history.replace('/home')
  }
  const collapsed = useSelector((state: any) => state.collapsed)

  return (
    <Layout className="main-wrapper">
      {/* 左边菜单 */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <SideMenu />
      </Sider>
      {/* 右边主体内容 */}
      <Layout>
        <LayoutHeader />
        <div className="section-header">
          <Breadcrumb>{breadcrumbArr}</Breadcrumb>
        </div>
        <Content>
          <Switch>
            {token ? (
              <>
                <Route path="/home" component={Home} />
                <Route path="/me" component={Me} />
                <Route exact path="/article/publish" component={PublishArtical} />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Switch>
        </Content>
        {/* 尾部 */}
        <Footer>footer</Footer>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
