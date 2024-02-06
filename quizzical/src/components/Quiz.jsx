import { useEffect, useState } from 'react'
import { Question } from './Question'
import axios from 'axios'
const Quiz = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [questions, setQuestions] = useState([])
  const [countAnswer, setCountAnswer] = useState(0)

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=5&type=multiple&token=37ae13f4659c857513aec1daf299a2a959c6b4078a008af5c998c796d5e724da`)
        setQuestions(response.data.results)
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    })()
  }, [])

  const selectAnswer = (answer, questionTitle) => {
    setCountAnswer(prevState => prevState < 5 ? prevState + 1 : prevState)
    setQuestions(prevState => {
      const newState = prevState.map(question => {
        if (question.question === questionTitle) {
          return { ...question, answer: answer }
        }
        return question
      })
      return newState
    })
  }

  return (
    <>
      {!isLoading && isError ? <p className='notices'>An error occured</p> : (isLoading ? <p className='notices'>loading...</p> : (
        <div className='questions__list'>
          {
            Array.isArray(questions) && questions.length > 0 ? questions.map((question, index) => <Question key={index} selectAnswer={selectAnswer} {...question} />) : ''
          }
        </div>
      ))}

      <div className='actions'>
        {countAnswer === 5 && <button className='check'>Check answers</button>}
      </div>
    </>
  )
}

export default Quiz