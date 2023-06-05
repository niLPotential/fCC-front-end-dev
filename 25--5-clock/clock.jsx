const { useState } = React;

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

function Timer({ min, isRunning, setIsRunning, setIsSession }) {
  const [sec, setSec] = useState(min * 60);

  function handleStart() {
    setIsRunning(true);
  }

  function handleStop() {
    setIsRunning(false);
  }

  if (sec === 0) {
    setIsSession((is) => !is);
  }

  if (isRunning) {
    setTimeout(() => setSec((s) => s - 1), 100);
  }

  return (
    <div>
      <div id="time-left">{sec}</div>

      <button id="start_stop" onClick={isRunning ? handleStop : handleStart}>
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
}

function Clock() {
  const [session, setSession] = useState(1);
  const [breakLength, setBreak] = useState(2);
  const [isSession, setIsSession] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const min = isSession ? session : breakLength;

  return (
    <div>
      <SetLength name="session" min={session} set={setSession} />
      <SetLength name="break" min={breakLength} set={setBreak} />

      <div id="timer-label">{isSession ? "Session" : "Break"}</div>
      <Timer
        min={min}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        setIsSession={setIsSession}
        key={min}
      />

      <button id="reset">Reset</button>
    </div>
  );
}

const rootElem = document.getElementById("root");
const root = ReactDOM.createRoot(rootElem);
root.render(<Clock />);
