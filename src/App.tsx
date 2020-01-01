import React, { PureComponent } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import store from './store'
export interface Iprops {
  [key: string]: any
}
export interface Istate {
  count: number
}
export default class App extends PureComponent<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props)
    this.state = {
      count: store.getState()
    }
  }
  componentDidMount () {
    store.subscribe(() => {
      this.setState({
        count: store.getState()
      })
    })
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          {/*只匹配其中一个*/}
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}
