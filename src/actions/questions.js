import { saveQuestionAnswer, saveQuestion } from "../utils/api"
import { showLoading, hideLoading } from "react-redux-loading-bar"

export const RECEIVED_QUESTIONS = 'RECEIVED_QUESTIONS'
export const ANSWER_QUESTIONS = 'ANSWER_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion(question, authedUser) {
    return {
        type: ADD_QUESTION,
        question,
        authedUser
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
        .then((question) => {
            dispatch(addQuestion(question, authedUser))
        })
        .then(() => dispatch(hideLoading()))
    }
}

export function recieveQuestions(questions) {
    return {
        type: RECEIVED_QUESTIONS,
        questions,
    }
}

function saveAnswer({ qid, authedUser, answer }) {
    return {
        type: ANSWER_QUESTIONS,
        qid,
        authedUser,
        answer
    }
}

export function handleSaveAnswer(info) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestionAnswer(info)
        .then(() => {
            dispatch(saveAnswer(info))
        })
        .then(() => dispatch(hideLoading()))
    }
}