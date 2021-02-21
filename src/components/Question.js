import React, { Component } from "react";
import { connect } from "react-redux";
import { handleVote } from "../actions/shared";
import { Link, withRouter } from "react-router-dom";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onDetailsPage: this.props.onDetailsPage
        ? this.props.onDetailsPage
        : false, //defaults to false
      withSelection: this.props.withSelection
        ? this.props.withSelection
        : false, //defaults to false
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
      this.setState({ withSelection: false });
    }
  };

  render() {
    const { question, id } = this.props;
    const { author } = this.props;

    if (question === null) {
      return (
        <h2 className="center">
          We are sorry, a question with the given id does not exist.
        </h2>
      );
    }

    const { optionOne, optionTwo } = question;
    const { name, avatarURL } = author;

    return (
      <div className="tweet">
        <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{author ? author.name : "Unknown author"} asks:</span>
          </div>
          <div>
            <p>Would you rather...</p>
            {this.state.onDetailsPage && this.state.withSelection ? (
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
              <div>
                <p>... {optionOne.text} or</p>
                <p>... {optionTwo.text}?</p>
              </div>
            )}
          </div>
          <div>
            {this.state.onDetailsPage ? (
              this.state.withSelection && (
                <button
                  onClick={this.submitVote}
                  disabled={
                    this.state.withSelection &&
                    this.state.onDetailsPage &&
                    this.state.selectedOption === ""
                  }
                >
                  Submit
                </button>
              )
            ) : (
              //Link to DetailsPage
              <Link className="linkBtn" to={`/questions/${id}`}>
                View Poll
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  console.log(`In Question: id = ${id}`);

  return {
    authedUser,
    question: question ? question : null,
    author: question ? users[question.author] : 0,
  };
}

export default withRouter(connect(mapStateToProps)(Question));
