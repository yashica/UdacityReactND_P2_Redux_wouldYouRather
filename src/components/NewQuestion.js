import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/shared";

class NewQuestion extends Component {
  state = {
    text_option1: "",
    text_option2: "",
  };
  handleInput1Change = (e) => {
    this.setState({ text_option1: e.target.value });
  };
  handleInput2Change = (e) => {
    this.setState({ text_option2: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const { text_option1, text_option2 } = this.state;
    const { dispatch } = this.props;
    // todo: Add Tweet to Store
    dispatch(handleAddQuestion(text_option1, text_option2));

    console.log(
      `New Question: Would you rather ${text_option1} or ${text_option2} ?`
    );

    this.setState(() => ({
      text_option1: "",
      text_option2: "",
    }));
  };
  render() {
    const { text_option1, text_option2 } = this.state;

    /* todo: Redirect to / if submitted */

    const option1Left = 280 - text_option1.length;
    const option2Left = 280 - text_option2.length;

    return (
      <div>
        <h3 className="center">Create a New Question</h3>

        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <h4>Would you rather</h4>
          <textarea
            placeholder="... option one ..."
            value={text_option1}
            onChange={this.handleInput1Change}
            className="textarea"
            maxLength={280}
          />
          {option1Left <= 100 && (
            <div className="tweet-length">{option1Left}</div>
          )}
          <h4>or</h4>
          <textarea
            placeholder="... option two ..."
            value={text_option2}
            onChange={this.handleInput2Change}
            className="textarea"
            maxLength={280}
          />
          {option2Left <= 100 && (
            <div className="tweet-length">{option2Left}</div>
          )}
          <h4>?</h4>
          <button
            className="btn"
            type="submit"
            disabled={text_option1 === "" || text_option2 === ""}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewQuestion);
