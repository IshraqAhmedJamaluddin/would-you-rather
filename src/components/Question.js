import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Link } from 'react-router-dom'

class Question extends Component {
    render () {
        const { question } = this.props

        if (question == null) {
            return <p>This question doesn't exist</p>
        }

        const {
            id, avatar, name, optionOne
        } = question
        return (
            <div>
                <p>{name} asks:</p>
                <img
                    src={`/images/${avatar}`}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <p>Would you rather</p>
                <p>...{optionOne.text}...</p>
                <Link to={`/questions/${id}`}>View Poll</Link>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, {id}) {
    const question = questions[id]

    return {
        authedUser,
        question: question ? formatQuestion(question, users[question.author], authedUser) : null
    }
}

export default connect(mapStateToProps)(Question)