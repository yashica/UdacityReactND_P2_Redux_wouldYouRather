import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          <h3 className="center">Your Timeline</h3>
          <ul className="dashboard-list">
            {this.props.questionIds.map((id) => (
              <li key={id}>
                <div>QUESTION ID: {id}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="center">
            Questions answered by {this.props.authedUser}
          </h3>
          <ul className="dashboard-list">
            {this.props.answeredQuestionIds.map((id) => (
              <li key={id}>
                <div>QUESTION ID: {id}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="center">
            Questions not answered yet by {this.props.authedUser}
          </h3>
          <ul className="dashboard-list">
            {this.props.unansweredQuestionsIds.map((id) => (
              <li key={id}>
                <div>QUESTION ID: {id}</div>
              </li>
            ))}
          </ul>
        </div>
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
