import { useEffect, useState } from 'react'
import { Question } from './Question'
import axios from 'axios'
const Quiz = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [questions, setQuestions] = useState([])
  const [verify, setVerify] = useState(false)
  const [countAnswer, setCountAnswer] = useState(0)
  const [results, setResults] = useState(0)
  const [start, setStart] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`https://opentdb.com/api.php?amount=5&type=multiple&difficulty=easy`)
        setQuestions(response.data.results)
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    })()
  }, [start])

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

  const restart = () => {
    setStart(prevState => !prevState)
    setVerify(false)
    setCountAnswer(0)
  }

  const checkAnswers = () => {
    setVerify(true)
    let correctAnswers = 0
    questions.map(question => {
      if (question.answer === question.correct_answer) {
        correctAnswers++
      }
    })
    setResults(correctAnswers)
  }

  return (
    <>
      {!isLoading && isError ? <p className='notices'>An error occured</p> : (isLoading ? <p className='notices'>loading...</p> : (
        <>
          <div className='questions__list'>
            {
              Array.isArray(questions) && questions.length > 0 ? questions.map((question, index) => <Question key={index} selectAnswer={selectAnswer} verify={verify} {...question} />) : ''
            }
          </div>
          <div className='actions'>
            {countAnswer === 5 && !verify && <button className='check' id='check' onClick={checkAnswers}>Check answers</button>}
            {verify && <div className='results'>Yout scored {results}/5 answers <button className='restart' id='restart' onClick={() => restart()}>Play again</button></div>}
          </div>
        </>
      ))}
    </>
  )
}

export default Quiz