import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class ListOfQuestions extends Component {
    render() {
        return (
            <ul>
            {this.props.questionIds.map((id) => (
                <li key={id}>
                    <Question id={id} />
                </li>
            ))}
            </ul>
        )
    }
}

function mapStateToProps ({}, {questionIds}) {
    return {
        questionIds: questionIds
    }
}

export default connect(mapStateToProps)(ListOfQuestions)