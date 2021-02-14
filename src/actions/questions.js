// import { saveQuestionAnswer } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SET_ANSWER = "SET_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function setAnswer({ questionId, authedUser, selectedOption }) {
  return {
    type: SET_ANSWER,
    questionId,
    authedUser,
    selectedOption,
  };
}
