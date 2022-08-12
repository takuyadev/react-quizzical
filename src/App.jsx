import React from 'react'
import he from 'he'
import './App.css';
import Button from './components/Button'
import Question from './components/Question'

export default function App(){
    const [questions, setQuestions] = React.useState([])
    const [gameState, setGameState] = React.useState(false)
    const [showAnswer, setShowAnswer] = React.useState(false)
    const [totalAnswer, setTotalAnswer] = React.useState(0)
    
    function getTrivia(){
        fetch("https://opentdb.com/api.php?amount=5&category=15")
            .then(res=>res.json())
            .then(data=>{
                setQuestions(()=>data.results.map((question, id)=>(
                    {
                        id: id,
                        question: he.decode(question.question),
                        answers: [
                            {
                                answer: he.decode(question.correct_answer),
                                isCorrect: true,
                                show: false,
                                selected: false
                            },
                            ...question.incorrect_answers.map(incorrect=>(
                                {
                                    answer: he.decode(incorrect),
                                    isCorrect: false,
                                    show: false,
                                    selected: false
                                }
                            ))
                        ].sort(() => Math.random() - 0.5)
                    }
                )))
            })
    }
    
    const questionsElements = questions.map((question, i) =>{
        return ( 
            <div>
                <Question 
                    key={i}
                    questionId={i}
                    showAnswer={showAnswer}
                    handleClick={(event, id)=>{
                            setQuestions(prevValue=>{
                            return prevValue.map((question, index)=>{
                                if(id==index){
                                    return {
                                        question: question.question,
                                        answers: question.answers.map((answer, i)=>{
                                            return {
                                                ...answer,
                                                selected: event.target.id == i && id == index ? !answer.selected : false
                                            }
                                        })
                                    }
                                } else {
                                    return question
                                }  
                            })
                        })
                    }}
                    show={showAnswer} 
                    answers={question.answers} 
                    question={question.question} />
                    {questions.length !== i+1 && <hr/>}
            </div>
        )
    })
    
    const startGamePage = 
        <div className="homepage">
            <h1>Video Game Historian Quiz</h1>
            <p>Test your knowledge of gaming history.</p>
            <Button handleClick={()=>setGameState(true)} text="Start Game"/>
        </div>
        
    const questionPage = 
    <div>
        <div className="question">
            {questionsElements}
        </div>
        <div className="button__section">
            {showAnswer && <h2>You scored {totalAnswer}/5 correct answers</h2>}
            <Button 
                handleClick={()=>{
                    if(showAnswer){
                        getTrivia();
                        setShowAnswer(false)
                    } else{
                        let total = 0
                        questions.forEach(question=>{
                            question.answers.forEach(answer=>{
                                if(answer.selected && answer.isCorrect){
                                    total += 1
                                }
                            })
                        })
                        setShowAnswer(true)
                        setTotalAnswer(total)
                    }
                }} text={showAnswer ? "Play again" : "Check Answer" }
            />
        </div>
        </div>
        
    
    React.useEffect(()=>{
        getTrivia()
    },[])
    
    React.useEffect(()=>{
        setQuestions(prevValue=>{
            return prevValue.map(question=>(
                {
                    question: question.question,
                    answers: question.answers.map(answer=>(
                        {
                            ...answer,
                            show: showAnswer
                        }
                    ))
                }
            ))
        })
    },[showAnswer])
    
    return (
        <div className="main">
        
            <img className="blob--1" src="./img/blob-1.png"/>
            <img className="blob--2" src="./img/blob-2.png"/>
           {gameState ? questionPage : startGamePage}
        </div>
    )
}