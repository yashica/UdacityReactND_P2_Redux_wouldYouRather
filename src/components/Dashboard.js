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
        </div>
        <div>
          {this.state.page === "page1" ? (
            <button
              className="dashboard-tabButton-selected"
              onClick={() => {
                this.setState({ page: "page1" });
              }}
            >
              Unanswered Questions
            </button>
          ) : (
            <button
              className="dashboard-tabButton"
              onClick={() => {
                this.setState({ page: "page1" });
              }}
            >
              Unanswered Questions
            </button>
          )}
          {this.state.page === "page2" ? (
            <button
              className="dashboard-tabButton-selected"
              onClick={() => {
                this.setState({ page: "page2" });
              }}
            >
              Answered Questions
            </button>
          ) : (
            <button
              className="dashboard-tabButton"
              onClick={() => {
                this.setState({ page: "page2" });
              }}
            >
              Answered Questions
            </button>
          )}
        </div>
        {this.state.page === "page1" ? (
          <div className="dashboard-tabPage">
            {this.props.unansweredQuestionsIds.length > 0 ? (
              <ul className="dashboard-list">
                {this.props.unansweredQuestionsIds.map((id) => (
                  <li key={id}>
                    <Question id={id} withSelection={true} />
                  </li>
                ))}
              </ul>
            ) : (
              <h3 className="center">
                No open polls. For adding a new question got to 'New Question'.
              </h3>
            )}
          </div>
        ) : (
          <div className={"dashboard-tabPage"}>
            {this.props.answeredQuestionIds.length > 0 ? (
              <ul className="dashboard-list">
                {this.props.answeredQuestionIds.map((id) => (
                  <li key={id}>
                    <Question id={id} />
                  </li>
                ))}
              </ul>
            ) : (
              <h3 className="center">No questions answered yet.</h3>
            )}
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
