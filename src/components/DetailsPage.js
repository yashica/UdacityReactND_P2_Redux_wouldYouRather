import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline,
  TiStarburstOutline,
  TiStarOutline,
} from "react-icons/ti"; //IoMdCheckmarkCircleOutline

import { IoMdCheckmarkCircleOutline } from "react-icons/io";

class DetailsPage extends Component {
  render() {
    const {
      qid,
      question,
      answered,
      authedUser,
      selectedOption,
      votesOptionOne_pct,
      votesOptionTwo_pct,
    } = this.props;

    // var optionOneStyle = classNames({
    //   selectedOption: selectedOption === "optionOne",
    //   notSelectedOption: !selectedOption === "optionOne",
    // });
    return (
      <div>
        {answered ? (
          <div className="detailsContainer">
            <Question id={qid} />
            <div>
              <p style={{ color: "green" }}>
                Your vote: {selectedOption && selectedOption}
              </p>
              <p
                // className={`${
                //   selectedOption === "optionOne"
                //     ? "selectedOption"
                //     : "notSelectedOption"
                // }`}
                style={
                  selectedOption === "optionOne"
                    ? { color: "green" }
                    : { color: "red" }
                }
              >
                {votesOptionOne_pct}% voted for option one
              </p>
              <p
                style={
                  selectedOption === "optionTwo"
                    ? { color: "green" }
                    : { color: "red" }
                }
                // className={`${
                //   selectedOption === "optionTwo"
                //     ? "selectedOption"
                //     : "notSelectedOption"
                // }`}
              >
                {votesOptionTwo_pct}% voted for option two
              </p>
            </div>
          </div>
        ) : (
          <div className="detailsContainer">
            <Question id={qid} withSelection={true} />
          </div>
        )}
        {/* DETAILS PAGE */}
        {/* <Tweet id={id} />
        <NewTweet id={id} />
        {replies.length !== 0 && <h3 className="center">Replies</h3>}
        <ul>
          {replies.map((replyId) => (
            <li key={replyId}>
              <Tweet id={replyId} />
            </li>
          ))}
        </ul> */}
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
    votesOptionOne_pct = 17;
    votesOptionTwo_pct = 83;
    // votesOptionOne_pct = Math.round(
    //   votesOptionOne / (votesOptionOne + votesOptionTwo)
    // );
    // votesOptionTwo_pct = Math.round(
    //   votesOptionOne / (votesOptionOne + votesOptionTwo)
    // );
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
