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

ReactDOM.render(<MyClassComponent xx="xx1" />, document.getElementById("root"));
