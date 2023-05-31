const { useState } = React;

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

function Timer() {
  let min = "00";
  let sec = "00";

  let time = 20000;
  let countdown = setInterval(function () {
    sec = Math.floor(time / 1000).toString();

    time -= 1000;
    if (time < 0) {
      clearInterval(countdown);
    }
  }, 1000);

  return (
    <div>
      <div id="timer-label">Session</div>

      <div id="time-left">{min}:{sec}</div>
    </div>
  );
}

function Clock() {
  const [session, setSession] = useState(25);
  const [breakLength, setBreak] = useState(5);

  return (
    <div>
      <Session session={session} setSession={setSession} />
      <Break breakLength={breakLength} setBreak={setBreak} />
      <Timer />

      <button id="start-stop"></button>

      <button id="reset"></button>
    </div>
  );
}

const rootElem = document.getElementById("root");
const root = ReactDOM.createRoot(rootElem);
root.render(<Clock />);
