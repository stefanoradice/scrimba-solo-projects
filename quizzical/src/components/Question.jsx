export const Question = (props) => {
    const {title, answer, question, incorrect_answers, correct_answer } = props

    const allAnswers = incorrect_answers
    if (!incorrect_answers.includes(correct_answer)) {
        allAnswers.splice(Math.floor(Math.random() * (incorrect_answers.length + 1)), 0, correct_answer)
    }
    return (
        <div className='questions__item'>
            <h2>{question}</h2>
            <div className='answers__list'>
                {allAnswers.map((currentAnswer, index) => {
                    let selected = question === title && currentAnswer === answer ? 'selected' : ''
                    return <button key={index} className={`answers__item ${selected}`} onClick={() => props.selectAnswer(currentAnswer, question)}>{currentAnswer}</button>
                })}
            </div>
        </div>
    )
}
