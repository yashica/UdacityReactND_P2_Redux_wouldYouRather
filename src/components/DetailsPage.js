import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class DetailsPage extends Component {
  render() {
    const {
      qid,
      answered,
      selectedOption,
      votesOptionOne_pct,
      votesOptionTwo_pct,
    } = this.props;

    return (
      <div>
        <div>
          <h2 className="center">{answered ? "Results" : "Poll"}</h2>
        </div>
        {answered ? (
          <div className="detailsContainer">
            <Question id={qid} onDetailsPage={true} withSelection={false} />
            <div>
              <h3 className="center" style={{ color: "green" }}>
                Your vote: {selectedOption && selectedOption}
              </h3>
              <p
                className="center"
                style={
                  selectedOption === "optionOne"
                    ? { color: "green" }
                    : { color: "maroon" }
                }
              >
                {votesOptionOne_pct}% voted for option one
              </p>
              <p
                className="center"
                style={
                  selectedOption === "optionTwo"
                    ? { color: "green" }
                    : { color: "maroon" }
                }
              >
                {votesOptionTwo_pct}% voted for option two
              </p>
            </div>
          </div>
        ) : (
          <div className="detailsContainer">
            <Question id={qid} onDetailsPage={true} withSelection={true} />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { qid } = props.match.params;

  const question = questions[qid];
  const answered = Object.keys(users[authedUser].answers).includes(qid);
  let selectedOption = null;
  let votesOptionOne_pct = null;
  let votesOptionTwo_pct = null;
  if (answered) {
    selectedOption = users[authedUser].answers[qid];
    let votesOptionOne = question.optionOne.votes.length;
    let votesOptionTwo = question.optionTwo.votes.length;
    votesOptionOne_pct = Math.round(
      (votesOptionOne / (votesOptionOne + votesOptionTwo)) * 100
    );
    votesOptionTwo_pct = Math.round(
      (votesOptionTwo / (votesOptionOne + votesOptionTwo)) * 100
    );
  }

  return {
    qid,
    question,
    answered,
    selectedOption,
    votesOptionOne_pct,
    votesOptionTwo_pct,
  };
}

export default connect(mapStateToProps)(DetailsPage);
