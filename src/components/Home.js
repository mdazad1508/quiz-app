import React, { useEffect, useState } from "react";
import "./home.css";
import VerticalNavigation from "./Navigation";
import { useRef } from "react";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import Timer from "./Timer";

function Home() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const childRef = useRef(null);
  const timerChildRef = useRef(null);
  const [myQuestions, setMyQuestions] = useState();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function getQuestions() {
      timerChildRef.current.startHandler();
      setLoading(true);
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=15"
        );
        console.log(response);
        const results = response.data.results;

        const questions = results?.map((result) => {
          const { question, correct_answer, incorrect_answers } = result;

          // Create an array of options
          let options=[];
          if(incorrect_answers.length===3){
            options = [
              { id: 0, text: correct_answer, isCorrect: true },
              { id: 1, text: incorrect_answers[0], isCorrect: false },
              { id: 2, text: incorrect_answers[1], isCorrect: false },
              { id: 3, text: incorrect_answers[2], isCorrect: false },
            ];
          }else{
            options = [
              { id: 0, text: correct_answer, isCorrect: true },
              { id: 1, text: incorrect_answers[0], isCorrect: false }
            ]
          }


          // Shuffle the options to randomize their order
          shuffleArray(options);

          return {
            text: question,
            options,
          };
        });
        console.log(questions);

        // Function to shuffle an array randomly
        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
        }

        setMyQuestions(questions);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getQuestions();
  }, []);

  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < myQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      timerChildRef.current.stopHandler();
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
    timerChildRef.current.resetHandler();
    timerChildRef.current.startHandler();
  };

  useEffect(() => {
    const handleClick = () => {
      childRef.current.callHandleClick(currentQuestion);
    };

    handleClick();
  }, [currentQuestion]);

  const submitHandler=()=>{
    setShowResults(true);
    timerChildRef.current.stopHandler();
  }

  return (
    <div className="Apphome">
      
      <div className="mainheader">
      <Timer subFun = {submitHandler} ref={timerChildRef} />
      <h1 className="header">CAUSAL FUNNEL QUIZ APP</h1>
      <button className="sbtn" onClick={submitHandler}>Submit </button>
      </div>
     
      {loading ? (
         <div>
          <ScaleLoader  color="#fff" height={60}/>
          <p style={{color:"white"}}>feching questions...</p>
         </div>
        
      ) : (
        <div className="content">
          {/* 3. Show results or show the question game  */}
          {showResults ? (
            /* 4. Final Results */
            <div className="final-results">
              <h1>Final Results</h1>
              <h2>
                {score} out of {myQuestions.length} correct - (
                {(score / myQuestions.length).toFixed(2) * 100}%)
              </h2>
              <button onClick={() => restartGame()}>Restart Quiz Again</button>
            </div>
          ) : (
            /* 5. Question Card  */
            <div className="question-card">
              {/* Current Question  */}
              <h2>
                Question: {currentQuestion + 1} out of {myQuestions?.length}
              </h2>
              <h3 className="question-text">
                {myQuestions && myQuestions[currentQuestion].text}
              </h3>

              {/* List of possible answers  */}
              <ul>
                {myQuestions && myQuestions[currentQuestion]?.options.map((option) => {
                  return (
                    <li
                      key={option.id}
                      onClick={() => optionClicked(option.isCorrect)}
                    >
                      {option.text}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div>
            <VerticalNavigation
              questions={myQuestions}
              fun={setCurrentQuestion}
              ref={childRef}
            />
          </div>
        </div>
      )}

      <h3 className="footer">developed by Md Azad</h3>
    </div>
  );
}

export default Home;
