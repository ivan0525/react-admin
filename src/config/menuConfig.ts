const routerList: Iroute[] = [
  {
    path: '/home',
    breadcrumbName: '首页',
    icon: 'home'
  },
  {
    path: '/me',
    breadcrumbName: '个人中心',
    icon: 'user'
  },
  {
    path: '/article',
    breadcrumbName: '文章管理',
    icon: 'snippets',
    children: [
      { path: '/article/category', breadcrumbName: '文章总揽', icon: 'bars' },
      { path: '/article/publish', breadcrumbName: '发布文章', icon: 'tool' }
    ]
  }
]

export const breadcrumbNameMap: { [key: string]: string } = {}
// 生成面包屑map
function generateBreadcrumbNameMap(routerList: Iroute[]) {
  routerList.forEach((item: Iroute, index: number) => {
    if (item.children) {
      generateBreadcrumbNameMap(item.children)
    }
    breadcrumbNameMap[item.path] = item.breadcrumbName
  })
}

generateBreadcrumbNameMap(routerList)

export interface Iroute {
  path: string
  breadcrumbName: string
  icon?: string
  children?: Iroute[]
}

export default routerList
