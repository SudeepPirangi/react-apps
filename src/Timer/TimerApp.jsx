import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

import TimerCard from './TimerCard';
import './TimerApp.css';

const TimerApp = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [timers, setTimers] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  let universalTimer = null;

  const startTimer = (timerId) => {
    setTimers(timers.map(thisTimer => {
      if (thisTimer.id === timerId) {
        return { ...thisTimer, status: 'start' };
      }
      return thisTimer;
    }))
    setSeconds(seconds => seconds + 1);
    if (!timerRunning) {
      setTimerRunning(true);
    }
  };

  const stopTimer = (timerId) => {
    let activeTimers = 0;
    const updatedTimers = timers.map(thisTimer => {
      if (thisTimer.status === 'start') {
        activeTimers++;
      }
      if (thisTimer.id === timerId) {
        return { ...thisTimer, status: 'stop'};
      }
      return thisTimer;
    });
    setTimers(updatedTimers);
    setSeconds(seconds => 0);

    if (activeTimers === 1) {
      setTimerRunning(false);
    }
  };

  const resetTimer = (timerId) => {
    let activeTimers = 0;
    const updatedTimers = timers.map(thisTimer => {
      if (thisTimer.status === 'start') {
        activeTimers++;
      }
      if (thisTimer.id === timerId) {
        return { ...thisTimer, status: 'stop', time: 0 };
      }
      return thisTimer;
    });
    setTimers(updatedTimers);

    if (activeTimers === 1) {
      setTimerRunning(false);
    }
  };

  const deleteTimer = (timerId) => {
    setTimers(timers.filter(timer => timer.id !== timerId));
  };

  useEffect(() => {
    if (timerRunning) {
      universalTimer = setInterval(() => setSeconds(secs => secs + 1), 1000);
      setTimers(timers.map(thisTimer => {
        if (thisTimer.status === 'start') {
          return { ...thisTimer, time: thisTimer.time + 1 };
        }
        return thisTimer;
      }))
    } else {
      clearInterval(universalTimer);
    }
    return () => clearInterval(universalTimer);
  }, [timerRunning, seconds]);
  
  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  const createTimer = () => {
    setTimers([
      ...timers,
      {
        id: Date.now(),
        title,
        time: 0,
        status: 'stop',
      }
    ]);
    setTitle('');
  };
  
  return (
    <div className="container">
      <h1 className='header'>Timer</h1>
      <div className='divider'></div>

      {timers.map(timer => {
        return <TimerCard
          key={timer.id}
          timer={timer}
          startTimer={startTimer}
          stopTimer={stopTimer}
          resetTimer={resetTimer}
          deleteTimer={deleteTimer}
        />
      })}

      {showForm ? (
        <div className='input-form w75 br6'>
          <input type="name" className='w75 br6' placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className='buttonsSection w75'>
            <button className='button primary-outline' onClick={createTimer}>Create</button>
            <button className='button danger-outline' onClick={toggleForm}>Cancel</button>
          </div>
        </div>
      ) : (
        <FaPlus className='toggle-form br6' onClick={toggleForm} />
      )}
    </div>
  );
};

export default TimerApp;