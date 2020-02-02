const routerList: Iroute[] = [
  {
    path: '/home',
    name: '首页',
    icon: 'home'
  },
  {
    path: '/products',
    name: '商品',
    icon: 'appstore',
    children: [
      { path: '/category', name: '品类管理', icon: 'bars' },
      { path: '/product', name: '商品管理', icon: 'tool' }
    ]
  }
]

export interface Iroute {
  path: string
  name: string
  icon?: string
  children?: Iroute[]
}

export default routerList
