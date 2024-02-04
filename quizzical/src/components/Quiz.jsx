import React, { useState } from 'react'

const Quiz = () => {
  const [answers, setAnswers] = useState([])
  return (
    <>
      <div className='questions__list'>
        <div className='questions__item'>
          <h2>How would one say goodbye in Spanish?</h2>
          <div className='answers__list'>
            <button className='answers__item'>Adiós</button>
            <button className='answers__item'>Hola</button>
            <button className='answers__item'>Au Revoir</button>
            <button className='answers__item'>Salir</button>
          </div>
        </div>
      </div>
      <div className='actions'>
        <button className='check'>Check answers</button>
      </div>
    </>
  )
}

export default Quiz