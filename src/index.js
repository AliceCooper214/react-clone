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

// class MyClassComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { xxx: "999" };
//   }
//   render() {
//     return (
//       <div className="test-class" style={{ color: "red" }}>
//         <h2>Simple React App {this.state.xxx}</h2>
//         <span>xx1</span>
//         <span>xx2</span>
//       </div>
//     );
//   }
// }

// class MyClassComponent1 extends React.Component {
//   counter = 0;
//   constructor(props) {
//     super(props);
//     this.state = { count: "0" };
//   }
//   updateShowText(newText) {
//     this.setState({
//       count: newText,
//     });
//   }
//   render() {
//     return (
//       <div
//         className="test-class"
//         style={{
//           color: "red",
//           cursor: "pointer",
//           border: "1px solid gray",
//           borderRadius: "6px",
//           display: "inline-block",
//           padding: "6px 12px",
//         }}
//         onClick={() => this.updateShowText("" + ++this.counter)}
//       >
//         Simple React Counter: {this.state.count}
//       </div>
//     );
//   }
// }

// class MyClassComponent2 extends React.Component {
// counter = 0;
// isBlue = false;
// constructor(props) {
//   super(props);
//   this.state = { count: "0" };
//   this.myRef = React.createRef();
// }
// updateShowText(newText) {
//   this.setState({
//     count: newText,
//   });
//   const element = this.myRef.current;
//   element.style.color = this.isBlue ? "blue" : "red";
//   this.isBlue = !this.isBlue;
// }
// render() {
//   return (
//     <div
//       className="test-class"
//       ref={this.myRef}
//       style={{
//         color: "red",
//         cursor: "pointer",
//         border: "1px solid gray",
//         borderRadius: "6px",
//         display: "inline-block",
//         padding: "6px 12px",
//       }}
//       onClick={() => this.updateShowText("" + ++this.counter)}
//     >
//       Simple React Counter: {this.state.count}
//     </div>
//   );
// }
// }

// class CustomTextInput extends React.Component {
//   constructor(props) {
//     super(props);
//     // create a ref to store the textInput DOM element
//     this.textInput = React.createRef();
//     this.focusTextInput = this.focusTextInput.bind(this);
//   }

//   focusTextInput() {
//     // Explicitly focus the text input using the raw DOM API
//     // Note: we're accessing "current" to get the DOM node
//     this.textInput.current.focus();
//   }

//   render() {
//     // tell React that we want to associate the <input> ref
//     // with the `textInput` that we created in the constructor
//     return (
//       <div>
//         <input type="text" ref={this.textInput} />
//         <input
//           type="button"
//           value="Focus the text input"
//           onClick={this.focusTextInput}
//         />
//       </div>
//     );
//   }
// }

// class AutoFocusTextInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.textInput = React.createRef();
//   }

//   componentDidMount() {
//     this.textInput.current.focusTextInput();
//   }

//   render() {
//     return <CustomTextInput ref={this.textInput} />;
//   }
// }

class MyClassComponent extends React.Component {
  isReset = false;
  oldArr = ["A", "B", "C", "D", "E"];
  newArr = ["C", "B", "E", "F", "A"];
  constructor(props) {
    super(props);
    this.state = { arr: this.oldArr };
  }
  updateShowArr() {
    this.setState({
      arr: this.isReset ? this.oldArr : this.newArr,
    });
    this.isReset = !this.isReset;
  }
  render() {
    return (
      <div>
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
          onClick={() => this.updateShowArr()}
        >
          Change The Text
        </div>
        <div>
          {this.state.arr.map((item) => {
            return <div key={item}>{item}</div>;
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MyClassComponent xx="xx1" />, document.getElementById("root"));
