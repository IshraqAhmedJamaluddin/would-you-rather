import { RECEIVED_USERS, ADD_QUESTION_TO_USER, ADD_ANSWER_TO_USER } from '../actions/users'

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVED_USERS:
            return {
                ...state,
                ...action.users
            }
            break;

        case ADD_QUESTION_TO_USER:
            const { question, authedUser } = action;
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    questions: [
                        ...state[authedUser].questions,
                        question.id
                    ]
                }
            }
            break;

        case ADD_ANSWER_TO_USER:
            const { qid, answer } = action;
      
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [qid]: answer
                    }
                }
            }
            break;
    
        default:
            return state
            break;
    }
}