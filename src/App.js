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
}

function mapStateToProps({ authedUser }) {
  return {
    loggedIn: authedUser !== null, //loading is true as long as authedUser is still null
  };
}

export default connect(mapStateToProps)(App);
