import {
  _getUsers,
  _getQuestions,
  //_saveLikeToggle,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA.js";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

// export function saveLikeToggle (info) {
//   return _saveLikeToggle(info)
// }

export function saveQuestion(info) {
  return _saveQuestion({
    optionOneText: info.optionOneText,
    optionTwoText: info.optionTwoText,
    author: info.author,
  });
}

export function saveQuestionAnswer(info) {
  return _saveQuestionAnswer({
    authedUser: info.authedUser,
    qid: info.questionId,
    answer: info.selectedOption,
  });
}
