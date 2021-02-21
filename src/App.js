//import logo from './logo.svg';
import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import "./App.css";
import Dashboard from "./components/Dashboard";
import NewQuestion from "./components/NewQuestion";
import LeaderBoard from "./components/LeaderBoard";
import DetailsPage from "./components/DetailsPage";
import NavBar from "./components/NavBar";

import LoadingBar from "react-redux-loading";
import LoginView from "./components/LoginView";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        {}
        <Fragment>
          <LoadingBar />
          <div className="container">
            {this.props.loggedIn && <NavBar />}
            {this.props.loggedIn === true ? ( // do not show if authedUser === null or loading isn't finished
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/questions/:qid" component={DetailsPage} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/leaderboard" component={LeaderBoard} />
              </div>
            ) : (
              <LoginView />
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
  // render() {
  //   return (
  //     <div>
  //       <LoadingBar />
  //       {this.props.loading === true ? null : ( // do not show Dashboard until loading is finished
  //         // qid: 6ni6ok3ym7mf1p33lnez -> not answered by tylermcginnis
  //         // qid: xj352vofupe1dqz9emx13r -> answered by tylermcginnis
  //         <DetailsPage match={{ params: { qid: "xj352vofupe1dqz9emx13r" } }} />
  //         // <NewQuestion />
  //         // <Dashboard />
  //       )}
  //     </div>
  //   );
  // }
}

function mapStateToProps({ authedUser }) {
  return {
    loggedIn: authedUser !== null, //loading is true as long as authedUser is still null
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
