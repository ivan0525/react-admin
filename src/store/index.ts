import { createStore } from 'redux'

// reducer
function counter(state = 10, action: any) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const store = createStore(counter)

export default store
