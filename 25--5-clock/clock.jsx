const { useState, useEffect } = React;

function Clock() {
  const [session, setSession] = useState(1);
  const [breakLength, setBreak] = useState(2);
  const [isRunning, setIsRunning] = useState(false); // true while running, false while stopped;
  const [isSession, setIsSession] = useState(true); // true while session, false while break;
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const timeoutID = setTimeout(
      () => {
        if (sec === 0) {
          // Because of useEffect
          setSec(isSession ? breakLength * 60 : session * 60);
          setIsSession((is) => !is);
        } else if (isRunning) {
          setSec((s) => s - 1);
        }
      },
      100,
    );
    return () => clearTimeout(timeoutID);
  }, [isRunning, sec]);

  function handleSessionInc() {
    setSession((s) => Math.min(s + 1, 60));
  }

  function handleSessionDec() {
    setSession((s) => Math.max(s - 1, 1));
  }

  function handleBreakInc() {
    setBreak((b) => Math.min(b + 1, 60));
  }

  function handleBreakDec() {
    setBreak((b) => Math.max(b - 1, 1));
  }

  function handleStop() {
    setIsRunning((is) => !is);
  }

  function handleReset() {
    setSession(25);
    setBreak(5);
  }

  return (
    <div>
      <div>
        <div id="session-label">Session Length</div>
        <button id="session-decrement" onClick={handleSessionDec}>
          -
        </button>
        <div id="session-length">{session}</div>
        <button id="session-increment" onClick={handleSessionInc}>
          +
        </button>
      </div>

      <div>
        <div id="break-label">Break Length</div>
        <button id="break-decrement" onClick={handleBreakDec}>
          -
        </button>
        <div id="break-length">{breakLength}</div>
        <button id="break-increment" onClick={handleBreakInc}>
          +
        </button>
      </div>

      <div id="timer-label">{isSession ? "Session" : "Break"}</div>
      <div id="time-left">{Math.floor(sec / 60)}:{sec % 60}</div>

      <button id="start-stop" onClick={handleStop}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button id="reset" onClick={handleReset}>Reset</button>
    </div>
  );
}

const rootElem = document.getElementById("root");
const root = ReactDOM.createRoot(rootElem);
root.render(<Clock />);
