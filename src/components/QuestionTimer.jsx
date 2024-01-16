import { useEffect, useState } from "react";

const QuestionTimer = ({ timeout, onTimeout }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    setTimeout(() => {
      onTimeout();
    }, timeout);
  }, [timeout, onTimeout]);

// Above we should add timeout and onTimeout as dependencies to make sure that this effect function gets re-executed
// if one of those dependencies changes. It makes sense because of the parent component that
// should decide that the question timer timeout should change, we also want to reset the timer and set it again.

  useEffect(() => {
    setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime}/>;
};

export default QuestionTimer;
