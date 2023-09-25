import "./timer.css";
import React, { useState, useEffect, Fragment , forwardRef, useImperativeHandle} from "react";
const START_MINUTES = "30";
const START_SECOND = "00"; 
const START_DURATION = 10;

 const Timer =forwardRef((props,ref) =>{
  const [currentMinutes, setMinutes] = useState(START_MINUTES);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DURATION);
  const [isRunning, setIsRunning] = useState(false);


  useImperativeHandle(ref, () => ({
     startHandler(){
        setDuration(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10));
        // setMinutes(60 * 5);
        // setSeconds(0);
        setIsRunning(true);
     },
     stopHandler(){
        setIsStop(true);
    setIsRunning(false);
     },
     resetHandler(){
        setMinutes(START_MINUTES);
        setSeconds(START_SECOND);
        setIsRunning(false);
        setIsStop(false);
        setDuration(START_DURATION);

     },
     resumeHandler(){
        let newDuration =
      parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10);
    setDuration(newDuration);

    setIsRunning(true);
    setIsStop(false);
     }
  }));

  const startHandler = () => {
    setDuration(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10));
    // setMinutes(60 * 5);
    // setSeconds(0);
    setIsRunning(true);
  };
  const stopHandler = () => {
    // stop timer
    setIsStop(true);
    setIsRunning(false);
  };
  const resetHandler = () => {
    setMinutes(START_MINUTES);
    setSeconds(START_SECOND);
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DURATION);
  };

  const resumeHandler = () => {
    let newDuration =
      parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10);
    setDuration(newDuration);

    setIsRunning(true);
    setIsStop(false);
  };

  useEffect(() => {
    if (isRunning === true) {
      let timer = duration;
      var minutes, seconds;
      const interval = setInterval(function () {
        if (--timer <= 0) {
          resetHandler();
          props.subFun();

        } else {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          setMinutes(minutes);
          setSeconds(seconds);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <Fragment>
      <div className="Appx">
        <h3>Remaning Time</h3>
        <div className="time">
          {currentMinutes}
          <span className="mx-3">:</span>
          {currentSeconds}
        </div>
        </div>
    </Fragment>
  );
})

export default Timer;
