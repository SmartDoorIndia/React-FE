/** @format */

import { useState, useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [ callback ]);

  // Set up the interval.
  useEffect(() => {
    const id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [ delay ]);
}

function Timer() {
  const [ counter, setCounter ] = useState(0);
  const [ time, setTime ] = useState({ h: '00', m: '00', s: '00' });

  useInterval(() => {
    setCounter(counter + 1);
    setTime(secondsToTime(counter));
  }, 1000);

  return (
    <span>
      {time.h}:{time.m}:{time.s}
    </span>
  );
}

function secondsToTime(secs) {
  let hours = Math.floor(secs / (60 * 60));

  const divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  const divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  const obj = {
    h: hours,
    m: minutes,
    s: seconds,
  };
  return obj;
}

export default Timer;
