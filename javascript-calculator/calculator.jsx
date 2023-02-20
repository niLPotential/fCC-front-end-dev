"use strict";

class NumberComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <button id={this.props.id}>{this.props.id}</button>;
  }
}

const displayElem = document.getElementById("display");
const displayRoot = ReactDOM.createRoot(displayElem);
displayRoot.render(<NumberComponent id="zero" />);

// ReactDOM.render(<NumberComponent />, document.getElementById("display"));

// let number1 = 0;
// let number2 = 0;
// let operator = "";

// document.getElementById("equals").addEventListener("click", handleEqualsCLick);

// function handleEqualsCLick() {
// }
