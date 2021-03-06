import { getInitialData, saveQuestionAnswer, saveQuestion } from "../utils/api";
import {
  receiveUsers,
  updateUserVotes,
  updateUserQuestions,
} from "../actions/users"; //users actionCreator
import { receiveQuestions, setAnswer, addQuestion } from "../actions/questions"; //questions actionCreator
import { showLoading, hideLoading } from "react-redux-loading";

export function handleInitialData() {
  //use the redux thunk pattern (we return a function rather than an object), because we want to make an asynchronous request inside of this function
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users)); //dispatch action creator creating users action
      dispatch(receiveQuestions(questions)); //dispatch action creator creating questions action
      dispatch(hideLoading());
    });
  };
}

export function handleVote(info) {
  return (dispatch) => {
    dispatch(setAnswer(info));
    dispatch(updateUserVotes(info));

    return saveQuestionAnswer(info).catch((e) => {
      console.warn("Error in handleToggleTweet: ", e);
      dispatch(setAnswer(info));
      dispatch(updateUserVotes(info));
      alert("The was an error saving your vote. Try again.");
    });
  };
}

export function handleAddQuestion(text_option1, text_option2) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      optionOneText: text_option1,
      optionTwoText: text_option2,
      author: authedUser,
    })
      .then((question) => {
        const { id, author } = question;
        console.log(`saveQuestion returns id = ${id}, author = ${author}`);
        dispatch(addQuestion(question));
        dispatch(updateUserQuestions(question));
      })
      .then(() => dispatch(hideLoading()));
  };
}
