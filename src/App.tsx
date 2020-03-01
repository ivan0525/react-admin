import React, { PureComponent } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import BasicLayout from './layout'
import Login from './pages/Login/Login'
// import Home from './pages/Home/Home'
import store from './store'
export interface Iprops {
  [key: string]: any
}
export interface Istate {
  count: number
}
export default class App extends PureComponent<Iprops, Istate> {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            {/*只匹配其中一个*/}
            <Route path="/login" component={Login} />
            <Route path="/" component={BasicLayout} />
            <Redirect path="/" to="/home" />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}
