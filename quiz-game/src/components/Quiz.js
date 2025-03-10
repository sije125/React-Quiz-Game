import React, { useContext, useEffect } from 'react';
import Question from "./Question";
import { QuizContext } from "../context/quiz";

const Quiz = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const apiUrl = "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986"
  console.log("quizState", quizState);
  useEffect(() => { 
    if (quizState.questions.length > 0) {
      return;
    }
    console.log("on initialize");
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      dispatch({type: "LOADED_QUESTIONS", payload: data.results});
    });
  });
  return (
    <div className="quiz">
      {quizState.showResults && (
        <div className="results">
          <div className='congratulations'>congratulations</div>
          <div className='results-info'>
            <div>You have completed the quiz!</div>
            <div>You got {quizState.correctAnswersCount} out of {quizState.questions.length}</div>
            <div>Your score is {Math.floor((quizState.correctAnswersCount / quizState.questions.length) * 100)}%</div>
          </div>
          <div className='next-button' onClick={() => dispatch({type: "RESTART"})}>Restart</div>
        </div>
      )}
      
        
      {!quizState.showResults && quizState.questions.length > 0 && (
        <div>
          <div className="score">
            Question {quizState.currentQuestionIndex + 1}/ {quizState.questions.length}
          </div>
          <Question />
          <div className="next-button" onClick={() => dispatch({type: "NEXT_QUESTION"})}>
            Next Question
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
