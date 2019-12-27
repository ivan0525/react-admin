import { createStore } from 'redux'

// reducer
function counter(state = 0, action: any) {
  switch (action.type) {
    case 'INSERT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const store = createStore(counter)

export default store
