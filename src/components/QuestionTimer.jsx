import { useEffect, useState } from "react";

const QuestionTimer = ({ timeout, onTimeout, mode }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout)

    // We store both setTimeout and setInterval in variables,
    // we then return clearTimeout/clearInterval as cleanup functions
    // and pass inside the variable, in order to reset the timer that otherwise,
    // it would be executed twice due to React.StrictMode
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  // Above we should add timeout and onTimeout as dependencies to make sure that this effect function gets re-executed
  // if one of those dependencies changes. It makes sense because of the parent component that
  // should decide that the question timer timeout should change, we also want to reset the timer and set it again.

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
};

export default QuestionTimer;
