import { useEffect, useState } from 'react'
import { Question } from './Question'
import axios from 'axios'
const Quiz = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [countAnswer, setCountAnswer] = useState(0)

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=5&type=multiple`)
        setQuestions(response.data.results)
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    })()
  }, [])

  const selectAnswer = (answer, questionTitle) => {
    setCountAnswer(prevState => prevState < 5 ? prevState + 1 : prevState)
    setAnswers(prevState => {
      console.log(prevState.length)
      if (prevState.length <= 0) return [{ title: questionTitle, answer }]
      let answer_exists = false
      const newState = prevState.map(question => {
        if (question.title === questionTitle) {
          answer_exists = true
          return { ...question, answer }
        }
        return question
      })
      if (!answer_exists) return [...prevState, { title: questionTitle, answer }]
      return newState
    })
    /*     setQuestions(prevState => {
          const newState = prevState.map(question => {
            if (question.question === questionTitle) {
              return { ...question, answer: answer }
            }
            return question
          })
          return newState
        }) */
  }
  useEffect(() => {
    console.log(answers)
  }, [answers])
  const checkAnsers = () => {
    questions.forEach(element => {
      console.log(element, element.incorrect_answers.includes(element.answer))
    });
  }
  return (
    <>
      {!isLoading && isError ? <p className='notices'>An error occured</p> : (isLoading ? <p className='notices'>loading...</p> : (
        <div className='questions__list'>
          {
            Array.isArray(questions) && questions.length > 0 ? questions.map((question, index) => <Question key={index} selectAnswer={selectAnswer} {...answers} {...question} />) : ''
          }
        </div>
      ))}

      <div className='actions'>
        {countAnswer === 5 && <button className='check' id='check' onClick={checkAnsers}>Check answers</button>}
      </div>
    </>
  )
}

export default Quiz