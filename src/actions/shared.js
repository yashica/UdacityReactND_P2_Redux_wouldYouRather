import { getInitialData } from "../utils/api";
import { receiveUsers } from "../actions/users"; //users actionCreator
import { receiveQuestions } from "../actions/questions"; //questions actionCreator
import { setAuthedUser } from "../actions/authedUser"; //authedUser actionCreator

const AUTHED_ID = "tylermcginnis";

export function handleInitialData() {
  //use the redux thunk pattern (we return a function rather than an object), because we want to make an asynchronous request inside of this function
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users)); //dispatch action creator creating users action
      dispatch(receiveQuestions(questions)); //dispatch action creator creating questions action
      dispatch(setAuthedUser(AUTHED_ID)); //dispatch action creator creating authedUser action
    });
  };
}
