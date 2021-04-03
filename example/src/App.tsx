import React from 'react'
import { updateCurrentUser } from './actions'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <button
        onClick={async () => {
          dispatch(updateCurrentUser())
        }}
      >
        hello
      </button>
    </div>
  )
}

export default App
