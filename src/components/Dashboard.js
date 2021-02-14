import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { page: "page1" };
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          <h3 className="center">Would You Rather..</h3>
          {/* <ul className="dashboard-list">
            {this.props.questionIds.map((id) => (
              <li key={id}>
                <div>QUESTION ID: {id}</div>
              </li>
            ))}
          </ul> */}
        </div>
        <div>
          {/* <ul>
            <li key={"page1"}> */}
          <button
            className="dashboard-tabButton"
            focus={this.state.page === "page1"}
            onClick={() => {
              this.setState({ page: "page1" });
            }}
          >
            Unanswered Questions
          </button>
          {/* </li>
            <li key={"page2"}> */}
          <button
            className="dashboard-tabButton"
            focus={this.state.page === "page2"}
            onClick={() => {
              this.setState({ page: "page2" });
            }}
          >
            Answered Questions
          </button>
          {/* </li>
          </ul> */}
        </div>
        {this.state.page === "page1" ? (
          <div className="dashboard-tabPage">
            {/* <h3 className="center">
              Questions not answered yet by {this.props.authedUser}
            </h3> */}
            <ul className="dashboard-list">
              {this.props.unansweredQuestionsIds.map((id) => (
                <li key={id}>
                  {/* <div>QUESTION ID: {id}</div> */}
                  <Question id={id} withSelection={true} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={"dashboard-tabPage"}>
            {/* <h3 className="center">
              Questions answered by {this.props.authedUser}
            </h3> */}
            <ul className="dashboard-list">
              {this.props.answeredQuestionIds.map((id) => (
                <li key={id}>
                  {/* <div>QUESTION ID: {id}</div> */}
                  <Question id={id} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  let questionEntries = Object.values(questions);
  //questions answered by authedUser, sorted by timestamp (latest first)
  let answeredQuestionIds = questionEntries
    .filter(function (value) {
      return (
        value.optionOne.votes.includes(authedUser) ||
        value.optionTwo.votes.includes(authedUser)
      );
    })
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((value) => value.id);
  //questions not answered by authedUser, sorted by timestamp (latest first)
  let unansweredQuestionsIds = questionEntries
    .filter(function (value) {
      return (
        !value.optionOne.votes.includes(authedUser) &&
        !value.optionTwo.votes.includes(authedUser)
      );
    })
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((value) => value.id);

  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    authedUser: authedUser,
    answeredQuestionIds: answeredQuestionIds,
    unansweredQuestionsIds: unansweredQuestionsIds,
  };
}

export default connect(mapStateToProps)(Dashboard);
