import React, { Component } from "react";
import { connect } from "react-redux";

class UserRankingItem extends Component {
  render() {
    const {
      userName,
      avatarURL,
      questionCount,
      answerCount,
      ranking,
    } = this.props;

    return (
      <div className="tweet">
        <img src={avatarURL} alt={`Avatar of ${userName}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{userName}</span>
          </div>
          <div>
            <div>
              <p>Answered Questions: {answerCount}</p>
              <p>Posted Questions: {questionCount}</p>
            </div>
          </div>
        </div>
        <div className="tweet-info">
          <div>
            <span>Score</span>
          </div>
          <div>
            <div>
              <h1 className="center">{questionCount + answerCount}</h1>
            </div>
          </div>
        </div>
        <div className="tweet-info">
          <div>
            <span>Ranking</span>
          </div>
          <div>
            <div>
              <h1 className="center">{ranking}.</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }, { id, ranking }) {
  const user = users[id];
  const answerCount = Object.keys(user.answers).length;

  console.log("ANSWERS from " + user.name);
  console.log(user.answers);
  console.log("length: " + Object.keys(user.answers).length);
  console.log("ranking: " + ranking);

  return {
    userName: user.name,
    avatarURL: user.avatarURL,
    questionCount: user.questions.length,
    answerCount: answerCount,
    ranking: ranking,
  };
}

export default connect(mapStateToProps)(UserRankingItem);
