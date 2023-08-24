import React from "./react";
import ReactDOM from "./react-dom";

// const App = (
//   <div className="test-class" style={{ color: "red" }}>
//     <h2>Simple React App</h2>
//     <span>xx1</span>
//     <span>xx2</span>
//   </div>
// );

// function MyFunctionComponent(props) {
//   return (
//     <div className="test-class" style={{ color: "red" }}>
//       <h2>Simple React App</h2>
//       <span>xx1</span>
//       <span>xx2</span>
//     </div>
//   );
// }

class MyClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { xxx: "999" };
  }
  render() {
    return (
      <div className="test-class" style={{ color: "red" }}>
        <h2>Simple React App {this.state.xxx}</h2>
        <span>xx1</span>
        <span>xx2</span>
      </div>
    );
  }
}

class MyClassComponent1 extends React.Component {
  counter = 0;
  constructor(props) {
    super(props);
    this.state = { count: "0" };
  }
  updateShowText(newText) {
    this.setState({
      count: newText,
    });
  }
  render() {
    return (
      <div
        className="test-class"
        style={{
          color: "red",
          cursor: "pointer",
          border: "1px solid gray",
          borderRadius: "6px",
          display: "inline-block",
          padding: "6px 12px",
        }}
        onClick={() => this.updateShowText("" + ++this.counter)}
      >
        Simple React Counter: {this.state.count}
      </div>
    );
  }
}

ReactDOM.render(
  <MyClassComponent1 xx="xx1" />,
  document.getElementById("root")
);
