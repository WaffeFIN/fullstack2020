import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const click = (type) => (() => store.dispatch({ type: type }))

  return (
    <div>
      <button onClick={click('GOOD')}>hyvä</button> 
      <button onClick={click('OK')}>neutraali</button> 
      <button onClick={click('BAD')}>huono</button>
      <button onClick={click('ZERO')}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)