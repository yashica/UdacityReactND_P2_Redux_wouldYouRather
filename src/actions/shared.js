import { getInitialData, saveQuestionAnswer } from "../utils/api";
import { receiveUsers, updateUserVotes } from "../actions/users"; //users actionCreator
import { receiveQuestions, setAnswer } from "../actions/questions"; //questions actionCreator
import { setAuthedUser } from "../actions/authedUser"; //authedUser actionCreator
import { showLoading, hideLoading } from "react-redux-loading";

const AUTHED_ID = "tylermcginnis";

export function handleInitialData() {
  //use the redux thunk pattern (we return a function rather than an object), because we want to make an asynchronous request inside of this function
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users)); //dispatch action creator creating users action
      dispatch(receiveQuestions(questions)); //dispatch action creator creating questions action
      dispatch(setAuthedUser(AUTHED_ID)); //dispatch action creator creating authedUser action
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
