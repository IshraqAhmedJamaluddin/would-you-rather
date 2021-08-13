import { RECEIVED_QUESTIONS, ANSWER_QUESTIONS, ADD_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVED_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
            break;
    
        case ANSWER_QUESTIONS:
            const { authedUser, qid, answer } = action;
            return {
              ...state,
              [qid]: {
                ...state[qid],
                [answer]: {
                  ...state[qid][answer],
                  votes: state[qid][answer].votes.concat(authedUser)
                }
              }
            }
            break;

        case ADD_QUESTION:
            return {
              ...state,
              [action.question.id]: action.question
            }
            break;
        
        default:
            return state
            break;
    }
}