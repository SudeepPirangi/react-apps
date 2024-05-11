import moment from 'moment';
import { FaTrash } from 'react-icons/fa';

import './TimerApp.css'

const formatTime = seconds => moment()
  .startOf('day')
  .seconds(seconds)
  .format('HH:mm:ss');

const TimerCard = ({
  timer,
  startTimer,
  stopTimer,
  resetTimer,
  deleteTimer,
}) => {
  const { id, title, time, status } = timer;
  return <div className="timer-card w75 br6 mb25">
    <div>
      <p className='title'>{title}</p>
      <p className='timer'>{formatTime(time)}</p>
      <p className='trash-icon'><FaTrash onClick={() => deleteTimer(id)} /></p>
    </div>
    <div className="card-btnGroup">
      {status === 'stop' && <button className='button start-button success-outline' onClick={() => startTimer(id)}>Start</button>}
      {status === 'start' && (
        <>
          <button className='button danger-outline' onClick={() => stopTimer(id)}>Stop</button>
          <button className='button primary-outline' onClick={() => resetTimer(id)}>Reset</button>
        </>
      )}
    </div>
  </div>;
};

export default TimerCard;