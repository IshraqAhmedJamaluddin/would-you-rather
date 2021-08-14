import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleSaveAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class QuestionPage extends Component {
    state = {
        choice: '',
        toHome: false
    }
    handleChange = (e) => {
        const choice = e.target.value
        this.setState(() => ({
            choice
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { choice } = this.state
        const { dispatch, authedUser, question } = this.props
        const qid = question['id']
        handleSaveAnswer({authedUser, qid, answer:choice })
        this.setState(() => ({
            toHome: true
        }))
    }
    render() {
        const { authedUser, answered, question } = this.props
        const { choice } = this.state
        if (question == null) {
            return <Redirect to='/notfound' />
        }
        return (
            <div>
                {answered &&
                    <div>
                        <h2>Asked by {question.name}</h2>
                        <img
                            src={`/images/${question.avatar}`}
                            alt={`Avatar of ${question.name}`}
                            width="100" length="100"
                        />
                        <div>
                            <h1>Results:</h1>
                            <div style={{backgroundColor: question.optionOne.votes.indexOf(authedUser) > -1 ? 'pink' : 'none'}}>
                                <p>Would you rather {question.optionOne.text}?</p>
                                <p>{Math.round((question.optionOne.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length)*100)*10)/10}%</p>
                                <p>{question.optionOne.votes.length} out of {question.optionOne.votes.length+question.optionTwo.votes.length} votes</p>
                            </div>
                            <div style={{backgroundColor: question.optionTwo.votes.indexOf(authedUser) > -1 ? 'pink' : 'none'}}>
                                <p>Would you rather {question.optionTwo.text}?</p>
                                <p>{Math.round((question.optionTwo.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length)*100)*10)/10}%</p>
                                <p>{question.optionTwo.votes.length} out of {question.optionOne.votes.length+question.optionTwo.votes.length} votes</p>
                            </div>
                        </div>
                    </div>
                }
                {!answered &&
                    <div>
                        <h2>{question.name} asks:</h2>
                        <img
                            src={`/images/${question.avatar}`}
                            alt={`Avatar of ${question.name}`}
                            width="100" length="100"
                        />
                        <h1>Would You Rather ...</h1>
                        <form className='new-answer' onSubmit={this.handleSubmit}>
                            <input
                                type="radio"
                                name="choice"
                                value="optionOne"
                                onChange={this.handleChange}
                            /> <label>{question.optionOne.text}</label>
                            <input
                                type="radio"
                                name="choice"
                                value="optionTwo"
                                onChange={this.handleChange}
                            /> <label>{question.optionTwo.text}</label>
                            <button
                                className='btn'
                                type='submit'
                                disabled={choice === ''}>
                                Submit
                            </button>
                        </form>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, props) {
    const { id } = props.match.params
    const question = questions[id] ? questions[id] : null
    const answered = questions[id] ? question.optionOne.votes.indexOf(authedUser) > -1 || question.optionTwo.votes.indexOf(authedUser) > -1 ? true: false  : null

    return {
        authedUser,
        question: question ? formatQuestion(question, users[question.author]) : null,
        answered
    }
}

export default connect(mapStateToProps, { handleSaveAnswer })(QuestionPage);