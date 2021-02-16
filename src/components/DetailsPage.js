import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class DetailsPage extends Component {
  render() {
    const { qid, question, answered } = this.props;
    return (
      <div>
        {answered ? (
          <Question id={qid} />
        ) : (
          <Question id={qid} withSelection={true} />
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
  const question = questions[authedUser];
  const answered = Object.keys(users[authedUser].answers).includes(qid);

  return {
    qid,
    question,
    answered,
    // replies: !tweets[id]
    //   ? []
    //   : tweets[id].replies.sort(
    //       (a, b) => tweets[b].timestamp - tweets[a].timestamp
    //     ),
  };
}

export default connect(mapStateToProps)(DetailsPage);
