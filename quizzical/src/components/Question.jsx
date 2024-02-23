import he from 'he'
export const Question = (props) => {
    const { answer, question, incorrect_answers, correct_answer } = props
    const allAnswers = incorrect_answers
    if (!incorrect_answers.includes(correct_answer)) {
        allAnswers.splice(Math.floor(Math.random() * (incorrect_answers.length + 1)), 0, correct_answer)
    }
    let statusAnswer = ''
    return (
        <div className='questions__item'>
            <h2>{he.decode(question)}</h2>
            <div className='answers__list'>
                {allAnswers.map((currentAnswer, index) => {
                    let selected = currentAnswer === answer ? 'selected' : ''
                    if (props.verify) {
                        selected += ' verify'
                        if (currentAnswer === correct_answer) {
                            statusAnswer = 'correct'
                        } else {
                            statusAnswer = 'wrong'
                        }
                    }
                    return <button key={index} className={`answers__item ${selected} ${statusAnswer}`} onClick={() => props.selectAnswer(currentAnswer, question)}>{he.decode(currentAnswer)}</button>
                })}
            </div>
        </div>
    )
}
