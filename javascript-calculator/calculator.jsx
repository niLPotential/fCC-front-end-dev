class NumberButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        type="button"
        className="btn btn-secondary"
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
      <button
        type="button"
        id="decimal"
        className="btn btn-secondary"
        onClick={this.props.handleDecimalClick}
      >
        .
      </button>
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
          id="zero"
          value="0"
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
        type="button"
        id={this.props.id}
        className="btn btn-secondary"
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
      <div
        id="operator-pad"
        className="btn-group-vertical ms-2 pt-2"
        role="group"
      >
        <OperatorButton
          id="divide"
          value="/"
          handleOperatorClick={this.props.handleOperatorClick}
        />
        <OperatorButton
          id="multiply"
          value="*"
          handleOperatorClick={this.props.handleOperatorClick}
        />
        <OperatorButton
          id="subtract"
          value="-"
          handleOperatorClick={this.props.handleOperatorClick}
        />
        <OperatorButton
          id="add"
          value="+"
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
  isMinus: false,
  reset: false,
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
  }

  state = initalState;

  handleNumberClick = (event) => {
    if (this.state.isMinus) {
      this.setState({
        ...this.state,
        display: this.state.display + event.target.value,
      });
    } else if (isStringOperator(this.state.display)) {
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
    if (this.state.isMinus) {
      this.setState({
        ...this.state,
        inputList: this.state.inputList.slice(0, -1),
        display: event.target.value,
        isMinus: false,
      });
    } else if (isStringOperator(this.state.display)) {
      if (event.target.value === "-") {
        this.setState({
          ...this.state,
          inputList: [...this.state.inputList, this.state.display],
          display: event.target.value,
          isMinus: true,
        });
      } else {
        this.setState({
          ...this.state,
          display: event.target.value,
        });
      }
    } else {
      this.setState({
        ...this.state,
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
      <div id="calculator-container" className="bg-dark p-4 rounded-4">
        <div id="input-list" className="bg-dark-subtle p-1 text-end">
          {this.state.inputList.join(" ")}
        </div>
        <div id="display" className="text-bg-light p-1 text-end">
          {this.state.display}
        </div>

        <div className="d-flex p-2">
          <div className="d-flex flex-column">
            <div className="btn-group my-2" role="group">
              <button
                type="button"
                id="clear"
                className="btn btn-secondary"
                onClick={this.handleClearClick}
              >
                Clear
              </button>
              <button
                type="button"
                id="equals"
                className="btn btn-secondary"
                onClick={this.handleEqualsClick}
              >
                =
              </button>
            </div>

            <NumberPad
              handleNumberClick={this.handleNumberClick}
              handleDecimalClick={this.handleDecimalClick}
            />
          </div>
          <OperatorPad handleOperatorClick={this.handleOperatorClick} />
        </div>
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
