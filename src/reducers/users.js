import { RECEIVED_USERS } from '../actions/users'
import { ANSWER_QUESTIONS, ADD_QUESTION } from '../actions/questions'

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVED_USERS:
            return {
                ...state,
                ...action.users
            }
            break;

        case ADD_QUESTION:
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

        case ANSWER_QUESTIONS:
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