import React, { FC } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import BasicLayout from './layout'
import Login from './pages/Login/Login'
import store from './store'
import './index.less'
const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {/*只匹配其中一个*/}
          <Route path="/login" component={Login} />
          <Route path="/" component={BasicLayout} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
