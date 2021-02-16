import React, { Component } from "react";
import { connect } from "react-redux";
import { handleVote } from "../actions/shared";
//import { formatTweet, formatDate } from "../utils/helpers";

// import {
//   TiArrowBackOutline,
//   TiHeartOutline,
//   TiHeartFullOutline,
// } from "react-icons/ti";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //withSelection: true,
      withSelection: this.props.withSelection
        ? this.props.withSelection
        : false,
      selectedOption: "",
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(event) {
    console.log(event.target.value);
    this.setState({ selectedOption: event.target.value });
  }

  submitVote = (e) => {
    e.preventDefault();
    if (this.state.selectedOption === "") {
      console.log(`No value selected yet`);
    } else {
      const { dispatch, question, authedUser } = this.props;

      dispatch(
        handleVote({
          questionId: question.id,
          authedUser,
          selectedOption: this.state.selectedOption,
        })
      );
    }
  };

  viewPoll = (e) => {
    e.preventDefault();
    console.log("View Poll..");

    // todo: Handle Like Tweet
  };
  // toParent = (e, id) => {
  //   e.preventDefault();
  //   // todo: Redirect to parent Tweet.
  // };
  render() {
    const { question } = this.props;
    const { author } = this.props;

    if (question === null) {
      return <p>This Question doesn't exist</p>;
    }

    const { optionOne, optionTwo } = question;

    const { name, avatarURL } = author;

    return (
      // <div className="question">
      //   <div>
      //     <span>{author ? author.name : "Unknown author"} asks:</span>
      //   </div>
      <div className="tweet">
        <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{author ? author.name : "Unknown author"} asks:</span>
            {/* <div>{formatDate(timestamp)}</div> */}
            {/* {parent && (
                <button
                  className="replying-to"
                  onClick={(e) => this.toParent(e, parent.id)}
                >
                  Replying to @{parent.author}
                </button>
              )}
              <p>{text}</p> */}
          </div>
          <div>
            <p>Would you rather...</p>
            {this.state.withSelection ? (
              <div onChange={this.onChangeValue}>
                <p>
                  <input type="radio" value="optionOne" name="answer" />{" "}
                  {optionOne.text} or
                </p>
                <p>
                  <input type="radio" value="optionTwo" name="answer" />{" "}
                  {optionTwo.text}?
                </p>
              </div>
            ) : (
              // <div>
              //   <input type="radio" id="option1" name="answers" value="option1">
              //     {optionOne.text} or
              //   </input>
              //   <label for="option1">{optionOne.text} or</label>
              //   <br></br>
              //   <input
              //     type="radio"
              //     id="option2"
              //     name="answers"
              //     value="option2"
              //   />
              //   <label for="option2">{optionTwo.text}?</label>
              //   <br></br>
              // </div>
              <div>
                <p>... {optionOne.text} or</p>
                <p>... {optionTwo.text}?</p>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={
                this.state.withSelection ? this.submitVote : this.viewPoll
              }
            >
              {this.state.withSelection ? "Submit" : "View Poll"}
            </button>
          </div>
          {/* <div className="tweet-icons">
              <TiArrowBackOutline className="tweet-icon" />
              <span>{replies !== 0 && replies}</span>
              <button className="heart-button" onClick={this.handleLike}>
                {hasLiked === true ? (
                  <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
                ) : (
                  <TiHeartOutline className="tweet-icon" />
                )}
              </button>
              <span>{likes !== 0 && likes}</span>
            </div> */}
        </div>
      </div>
      // </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const author = users[question.author];
  //const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  return {
    authedUser,
    question: question ? question : null,
    author: author,
    // ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
    // : null,
  };
}

export default connect(mapStateToProps)(Question);
