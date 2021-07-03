import { useEffect, useRef, useContext, useState } from 'react';
import styled from 'styled-components';

// Context
import {PointsContext} from '../context/Points';

const Timer = ({className}) => {
  const {
    startTimer,
    clearTimer,  
    setStartTimer,
    setCustomTimeout,
    setClearTimer
  } = useContext(PointsContext);
  const [time, setTime] = useState(60);
  const timerId = useRef();

  useEffect(() => {
    if (startTimer){
      timerId.current = setInterval(() => setTime(prev => prev -1), 1000);
    }
  }, [startTimer]);

  useEffect(() => {
    clearInterval(timerId.current);
    setTime(60);
    setClearTimer(false);
    setStartTimer(false);
  }, [clearTimer]);

  useEffect(() => {
    if (time === 0) {
      setTime(60)
      clearInterval(timerId.current);
      setCustomTimeout(true)
    }
  }, [time]);

  return <div className={className}>
  Timer: {time}
  </div>
}

export default Timer;