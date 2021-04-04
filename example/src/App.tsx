import React from 'react'
import { updateState } from './actions'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => dispatch(updateState())}>dispatch</button>
    </div>
  )
}

export default App
