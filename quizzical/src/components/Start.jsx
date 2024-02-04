import React from 'react'

const start = (props) => {
  return (
    <div className='start'>
        <h1>Quizzical</h1>
        <p>Click the button to start the quiz</p>
        <button id="start" className='button-start' onClick={props.start}>Start quiz</button>
    </div>
  )
}

export default start