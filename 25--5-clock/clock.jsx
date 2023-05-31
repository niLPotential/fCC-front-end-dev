const { useState, useEffect } = React;

function Session({ session, setSession }) {
  function handleSessionInc() {
    setSession((s) => Math.min(s + 1, 60));
  }

  function handleSessionDec() {
    setSession((s) => Math.max(s - 1, 1));
  }

  return (
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
  );
}

function Break({ breakLength, setBreak }) {
  function handleBreakInc() {
    setBreak((b) => Math.min(b + 1, 60));
  }

  function handleBreakDec() {
    setBreak((b) => Math.max(b - 1, 1));
  }

  return (
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
  );
}

function Timer({ min, setIsSession }) {
  const [sec, setSec] = useState(min * 60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSec((s) => s - 1);
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  if (sec < 0) {
    setIsSession((is) => !is);
  }

  return (
    <div>
      <div id="time-left">{Math.floor(sec / 60)}:{sec % 60}</div>
    </div>
  );
}

function Clock() {
  const [session, setSession] = useState(2);
  const [breakLength, setBreak] = useState(1);
  const [isSession, setIsSession] = useState(true); // true while session, false while break;

  return (
    <div>
      <Session session={session} setSession={setSession} />
      <Break breakLength={breakLength} setBreak={setBreak} />

      <div id="timer-label">{isSession ? "Session" : "Break"}</div>
      {isSession ? <Timer min={session} setIsSession={setIsSession} /> : null}
      {!isSession
        ? <Timer min={breakLength} setIsSession={setIsSession} />
        : null}

      <button id="start-stop"></button>

      <button id="reset">Reset</button>
    </div>
  );
}

const rootElem = document.getElementById("root");
const root = ReactDOM.createRoot(rootElem);
root.render(<Clock />);
