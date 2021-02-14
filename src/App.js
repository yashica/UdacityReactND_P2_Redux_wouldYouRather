//import logo from './logo.svg';
import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import "./App.css";
import Dashboard from "./components/Dashboard";
import LoadingBar from "react-redux-loading";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true ? null : ( // do not show Dashboard until loading is finished
          <Dashboard />
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null, //loading is true as long as authedUser is still null
  };
}

export default connect(mapStateToProps)(App);

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//export default App;
