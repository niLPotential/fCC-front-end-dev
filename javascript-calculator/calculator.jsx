class NumberButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        className={this.props.id === "zero" ? "col-8" : "col"}
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
        id="decimal"
        className="col"
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
      <div id="number-pad" className="row row-cols-3">
        <NumberButton
          id="nine"
          value="9"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="eight"
          value="8"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="seven"
          value="7"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="six"
          value="6"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="five"
          value="5"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="four"
          value="4"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="three"
          value="3"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="two"
          value="2"
          handleNumberClick={this.props.handleNumberClick}
        />
        <NumberButton
          id="one"
          value="1"
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
      <div id="operator-pad" className="row">
        <div className="col d-flex flex-column g-0">
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
      <div id="calculator-container" className="container border">
        <div id="input-list" className="text-end">
          {this.state.inputList.join(" ")}
        </div>
        <div id="display" className="text-end">{this.state.display}</div>

        <div className="row">
          <button
            id="clear"
            className="col-9"
            onClick={this.handleClearClick}
          >
            Clear
          </button>
          <button id="equals" className="col" onClick={this.handleEqualsClick}>
            =
          </button>
        </div>

        <div className="row">
          <div className="col-9">
            <NumberPad
              handleNumberClick={this.handleNumberClick}
              handleDecimalClick={this.handleDecimalClick}
            />
          </div>
          <div className="col">
            <OperatorPad handleOperatorClick={this.handleOperatorClick} />
          </div>
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
