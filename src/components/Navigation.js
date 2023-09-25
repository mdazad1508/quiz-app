import React, { forwardRef, useImperativeHandle, useState } from "react";
import "./navigation.css";

const VerticalNavigation = forwardRef((props, ref) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
    props.fun(index);
  };

  useImperativeHandle(ref, () => ({
    callHandleClick(indx) {
      handleQuestionClick(indx);
    },
  }));

  return (
    <div className="vertical-navigation">
      <h3> Curr Question No:{currentQuestion + 1}</h3>
      <div className="container">
        <ul>
          {props.questions?.map((question, index) => (
            <li
              key={index}
              className={index === currentQuestion ? "active" : ""}
              onClick={() => handleQuestionClick(index)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default VerticalNavigation;
