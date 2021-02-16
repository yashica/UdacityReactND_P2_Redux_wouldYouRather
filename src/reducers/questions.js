import {
  RECEIVE_QUESTIONS,
  SET_ANSWER,
  ADD_QUESTION,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SET_ANSWER:
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          [action.selectedOption]: {
            ...state[action.questionId][action.selectedOption],
            votes: state[action.questionId][
              action.selectedOption
            ].votes.concat([action.authedUser]),
          },
        },
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    default:
      return state;
  }
}
