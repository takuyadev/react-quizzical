import React from 'react'

export default function Question(props){
    
    let toggleButtonElements = props.answers.map((answer, i)=>{
        return <button 
            key={i}
            id={i}
            disabled={props.showAnswer}
            data-question={props.id}
            className={`toggle-btn 
            ${answer.selected && "toggle-btn--selected"} 
            ${props.showAnswer && "toggle-btn--show"}
            ${answer.show && "toggle-btn--"}${answer.isCorrect ? "correct" : "incorrect"}`} 
            onClick={(event)=>{
                props.handleClick(event, props.questionId)
            }}>{answer.answer}
        </button>
        }
    )
    
    return(
        <div className="question__item">
            <h2 className="question__title">{props.question}</h2>
            <div className="answers">
                {toggleButtonElements}
            </div>
        </div>
    )
}

Question.defaultProps = {
    question: "What is the question?",
    answers: [
        {
            answer: "question 1",
            result: false
        },
        {
            answer: "question 2",
            result: false
        },
        {
            answer: "question 3",
            result: true
        },
        {
            answer: "question 4",
            answer: false
        },
    ]
}