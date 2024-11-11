import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work');
  const [selectedTime, setSelectedTime] = useState(25);
  const [message, setMessage] = useState('⭐ 준비됐지? 이제 진짜로 일해보자! (진짜로…) ⭐');

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            setIsActive(false);
            if (mode === 'work') {
              setMode('break');
              setMinutes(5);
              setMessage('Great work! Time for a break 🎉');

            } else {
              setMode('work');
              setMinutes(selectedTime);
              setMessage('Break is over! Ready to focus again? 💪');

            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode, selectedTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive) {
      // Starting the timer
      if (mode === 'work') {
        const messages = [
          "할 수 있어! 아니, 해야 해! 💪",
          "집중할 시간! 아니면… 커피 한 잔 더? 🎯",
          "최고를 향해! 하지만 먼저 눈앞의 일부터…⭐",
          "집중하면 멋짐 폭발! 아니면 잠이라도 폭발? 🚀",
          "매 순간을 가치 있게! 그러다 보면 쉬는 시간도 가까워져! ⏰"
        ];
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
      } else {
        const breakMessages = [
          "배터리 부족! 충전할 시간이야! 🔋",
          "후~ 숨 고르고 다시 빡! 😌",
          "잠깐만 쉬자~ 리프레시 모드 ON! 🌿",
          "이 휴식, 노력의 대가다! 누려보자! ☕",
          "잠깐 뇌를 쉬게 해 줘야지, 안 그럼 과부하! 🎈"
        ];
        setMessage(breakMessages[Math.floor(Math.random() * breakMessages.length)]);
      }
    } else {
      // Pausing the timer
      setMessage('Timer paused - resume when ready');
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(selectedTime);
    setSeconds(0);
    setMessage('⭐ Ready to focus again?⭐');

  };

  const changeTime = (time) => {
    if (!isActive) {
      setSelectedTime(time);
      setMinutes(time);
      setSeconds(0);
    }
  };

  return (
    <div className="App">
      <div className="timer-container">
        <h1>Capu-Focus Timer ☕</h1>
        <div className="time-selector">
          <button 
            className={`time-button ${selectedTime === 1 ? 'active' : ''}`}
            onClick={() => changeTime(1)}
          >
            1 min
          </button>
          <button 
            className={`time-button ${selectedTime === 3 ? 'active' : ''}`}
            onClick={() => changeTime(3)}
          >
            3 min
          </button>
          <button 
            className={`time-button ${selectedTime === 5 ? 'active' : ''}`}
            onClick={() => changeTime(5)}
          >
            5 min
          </button>
          <button 
            className={`time-button ${selectedTime === 25 ? 'active' : ''}`}
            onClick={() => changeTime(25)}
          >
            25 min
          </button>
        </div>
        <div className="message-display">
          {message}
        </div>
        <div className="mode-indicator">
        {mode === 'work' ? '🎯 Focus Session' : '☕ Break Time'}

        </div>
        <div className="timer">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="controls">
          <button onClick={toggleTimer} className="control-button">
            {isActive ? '⏸ Pause' : '▶ Start'}
          </button>
          <button onClick={resetTimer} className="control-button">↺ Reset</button>
        </div>
        <h4> Bryan과 커피가 빚어낸 작품! <br />즐겁게 사용할 수 있길 바라요! 😄</h4>

      </div>
    </div>
  );
}

export default App;