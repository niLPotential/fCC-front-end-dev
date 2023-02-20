class NumberButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        id={this.props.id}
        value={this.props.value}
        onClick={this.props.handleNumberClick}
      >
        {this.props.value}
      </button>
    );
  }
}

class DecimalButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button id="decimal" onClick={this.props.handleDecimalClick}>.</button>
    );
  }
}

class NumberPad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="number-pad">
        <NumberButton
          id="zero"
          value="0"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="one"
          value="1"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="two"
          value="2"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="three"
          value="3"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="four"
          value="4"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="five"
          value="5"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="six"
          value="6"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="seven"
          value="7"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="eight"
          value="8"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="nine"
          value="9"
          handleNumberClick={this.props.handleNumberClick}
        />

        <DecimalButton handleDecimalClick={this.props.handleDecimalClick} />
      </div>
    );
  }
}

class OperatorButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        id={this.props.id}
        value={this.props.value}
        onClick={this.props.handleOperatorClick}
      >
        {this.props.value}
      </button>
    );
  }
}

class OperatorPad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="operator-pad">
        <OperatorButton
          id="add"
          value="+"
          handleOperatorClick={this.props.handleOperatorClick}
        />
        <OperatorButton
          id="subtract"
          value="-"
          handleOperatorClick={this.props.handleOperatorClick}
        />
        <OperatorButton
          id="multiply"
          value="*"
          handleOperatorClick={this.props.handleOperatorClick}
        />
        <OperatorButton
          id="divide"
          value="/"
          handleOperatorClick={this.props.handleOperatorClick}
        />
      </div>
    );
  }
}

let initalState = {
  inputList: [],
  display: "0",
  isDecimal: false,
  reset: false,
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
  }

  state = initalState;

  handleNumberClick = (event) => {
    if (isStringOperator(this.state.display)) {
      this.setState({
        ...this.state,
        inputList: [...this.state.inputList, this.state.display],
        display: event.target.value,
      });
    } else if (this.state.reset || this.state.display == "0") {
      this.setState({
        ...this.state,
        reset: false,
        display: event.target.value,
      });
    } else {
      this.setState({
        ...this.state,
        display: this.state.display + event.target.value,
      });
    }
  };

  handleDecimalClick = () => {
    if (!isStringOperator(this.state.display) && !this.state.isDecimal) {
      this.setState({
        ...this.state,
        display: this.state.display + ".",
        isDecimal: true,
      });
    }
  };

  handleOperatorClick = (event) => {
    if (isStringOperator(this.state.display)) {
      this.setState({
        ...this.state,
        display: event.target.value,
      });
    } else {
      this.setState({
        inputList: [...this.state.inputList, this.state.display],
        display: event.target.value,
        isDecimal: false,
      });
    }
  };

  handleEqualsClick = () => {
    let inputList = [...this.state.inputList, this.state.display];
    let result = parseFloat(inputList.shift());
    while (inputList.length > 1) {
      let input = inputList.shift();
      let n = inputList.shift();
      switch (input) {
        case "+":
          result += parseFloat(n);
          break;
        case "-":
          result -= parseFloat(n);
          break;
        case "*":
          result *= parseFloat(n);
          break;
        case "/":
          result /= parseFloat(n);
          break;
      }
    }

    this.setState({ ...initalState, display: result.toString(), reset: true });
  };

  handleClearClick = () => {
    this.setState(initalState);
  };

  render() {
    return (
      <div id="calculator-container">
        <div>{this.state.inputList.join(";")}</div>
        <div id="display">{this.state.display}</div>
        {/* <ol>{this.state.inputList.map((input) => <li>{input}</li>)}</ol> */}

        <NumberPad
          handleNumberClick={this.handleNumberClick}
          handleDecimalClick={this.handleDecimalClick}
        />
        <OperatorPad handleOperatorClick={this.handleOperatorClick} />

        <button id="equals" onClick={this.handleEqualsClick}>=</button>
        <button
          id="clear"
          onClick={this.handleClearClick}
        >
          Clear
        </button>
      </div>
    );
  }
}

function isStringOperator(str) {
  return ["+", "-", "*", "/"].includes(str);
}

const rootElem = document.getElementById("root");
const root = ReactDOM.createRoot(rootElem);
root.render(<Calculator />);
