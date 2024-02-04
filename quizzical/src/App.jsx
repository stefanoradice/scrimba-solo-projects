import { useState } from 'react'
import './App.css'
import Quiz from './components/Quiz'
import Start from './components/Start'

function App() {
  const [start, setStart] = useState(false)

  return (
    <div className='container'>
      {!start ? <Start start={() => setStart(true)} /> : <Quiz /> }
    </div>
  )
}

export default App
