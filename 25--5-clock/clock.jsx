const { useState, useEffect, useRef } = React;

function SetLength({ name, min, set }) {
  function handleInc() {
    set((s) => Math.min(s + 1, 60));
  }

  function handleDec() {
    set((s) => Math.max(s - 1, 1));
  }

  return (
    <div>
      <div id={`${name}-label`}>{name} length</div>
      <button id={`${name}-decrement`} onClick={handleDec}>-</button>
      <div id={`${name}-length`}>{min}</div>
      <button id={`${name}-increment`} onClick={handleInc}>+</button>
    </div>
  );
}

function secToMMSS(sec) {
  let min = Math.floor(sec / 60).toString();
  let s = (sec % 60).toString();

  if (min.length === 1) {
    min = "0" + min;
  }
  if (s.length === 1) {
    s = "0" + s;
  }
  return min + ":" + s;
}

function Clock() {
  const [session, setSession] = useState(25);
  const [breakLength, setBreak] = useState(5);
  const [isSession, setIsSession] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const min = isSession ? session : breakLength;
  const [sec, setSec] = useState(min * 60);

  const intervalRef = useRef(null);

  useEffect(() => {
    setSec(session * 60);
  }, [session]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSec((s) => s - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  function handleStartStop() {
    setIsRunning((is) => !is);
  }

  function handleReset() {
    setSession(25);
    setBreak(5);
    setIsRunning(false);
    setIsSession(true);
    setSec(25 * 60);
    beep.pause();
    beep.currentTime = 0;
  }

  if (sec < 0) {
    beep.play();
    setSec((isSession ? breakLength : session) * 60);
    setIsSession((is) => !is);
  }

  return (
    <div>
      <SetLength name="session" min={session} set={setSession} />
      <SetLength name="break" min={breakLength} set={setBreak} />

      <div id="timer-label">{isSession ? "Session" : "Break"}</div>
      <div id="time-left">{secToMMSS(sec)}</div>

      <button id="start_stop" onClick={handleStartStop}>
        {isRunning ? "Stop" : "Start"}
      </button>

      <button id="reset" onClick={handleReset}>Reset</button>
    </div>
  );
}

const rootElem = document.getElementById("root");
const root = ReactDOM.createRoot(rootElem);
root.render(<Clock />);
