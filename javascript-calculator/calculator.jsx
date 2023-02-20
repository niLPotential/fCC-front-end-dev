class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="display">
        {this.props.display.firstNumber}
        {this.props.display.operator}
        {this.props.display.secondNumber}
      </div>
    );
  }
}

class NumberButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button id={this.props.id} onClick={this.props.onClick}>
        {this.props.id}
      </button>
    );
  }
}

class OperatorButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <button id={this.props.id}>{this.props.id}</button>;
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    firstNumber: 10,
    secondNumber: 10,
    operator: "C",
    isSecondNumberActive: false,
  };

  render() {
    return (
      <div id="calculator-container">
        <Display display={this.state} />

        <NumberButton
          id="zero"
          onClick={() => {
            this.setState({ firstNumber: 0 });
          }}
        />
        <NumberButton id="one" />
        <NumberButton id="two" />
        <NumberButton id="three" />
        <NumberButton id="four" />
        <NumberButton id="five" />
        <NumberButton id="six" />
        <NumberButton id="seven" />
        <NumberButton id="eight" />
        <NumberButton id="nine" />

        <OperatorButton id="add" />
        <OperatorButton id="subtract" />
        <OperatorButton id="multiply" />
        <OperatorButton id="divide" />
      </div>
    );
  }
}

const rootElem = document.getElementById("root");
const root = ReactDOM.createRoot(rootElem);
root.render(<Calculator />);
