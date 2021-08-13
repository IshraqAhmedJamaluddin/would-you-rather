export const RECEIVED_USERS = 'RECEIVED_USERS'
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER'
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER'

export function receiveUsers(users) {
    return {
        type: RECEIVED_USERS,
        users,
    }
}
export function addQuestionToUser(question, authedUser) {
    return {
        type: ADD_QUESTION_TO_USER,
        question,
        authedUser
    }
}

export function saveAnswerToUser({ qid, authedUser, answer }) {
    return {
        type: ADD_ANSWER_TO_USER,
        qid,
        authedUser,
        answer
    }
}