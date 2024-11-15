import "@babel/polyfill"

import React from "react"
import ReactDOM from "react-dom"
import { applyMiddleware, createStore } from "redux"

import Counter from "./Counter"
import reducer from "./reducers"

import createSagaMiddleware from "redux-saga"
import rootSaga, { helloSaga } from "./sagas"

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)
// const store = createStore(reducer)

const action = (type) => store.dispatch({ type })

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action("INCREMENT")}
      onDecrement={() => action("DECREMENT")}
      onIncrementAsync={() => action("INCREMENT_ASYNC")}
    />,
    document.getElementById("root")
  )
}

render()
store.subscribe(render)
