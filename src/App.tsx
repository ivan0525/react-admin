import React, { PureComponent } from 'react'
// import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import Login from './pages/Login/Login'
// import Home from './pages/Home/Home'
import store from './store'
import Counter from './pages/Counter/Counter'
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

    const { count } = this.state
    return (
      // <BrowserRouter>
      //   <Switch>
      //     <Route path="/home" component={Home} />
      //     <Route path="/" component={Login} />
      //   </Switch>
      // </BrowserRouter>
      <>
        {store.getState()}
        <Counter
          value={count}
          onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
          onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        />
      </>
    )
  }
}
