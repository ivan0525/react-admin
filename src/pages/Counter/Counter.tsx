import React, { Component } from 'react'
export interface Iprops {
  value: number
  onIncrement: () => any
  onDecrement: () => any
}

export default class Counter extends Component<Iprops> {
  constructor(props: Iprops) {
    super(props)
  }

  render() {
    console.log(this.props)
    const { value, onIncrement, onDecrement } = this.props
    return (
      <p>
        Clicked: {value} times <button onClick={onIncrement}>+</button>{' '}
        <button onClick={onDecrement}>-</button>
      </p>
    )
  }
}
