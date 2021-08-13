import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListOfQuestions from './ListOfQuestions'

class Home extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><button onClick={showUnanswered}>Unansered Questions</button></li>
                    <li><button onClick={showAnswered}>Answered Questions</button></li>
                </ul>
                <div id="unanswered">
                    <ListOfQuestions questionIds={this.props.unansweredIds} />
                </div>
                <div id="answered" style={{display: 'none'}}>
                    <ListOfQuestions questionIds={this.props.answeredIds} />
                </div>
            </div>
        )
    }
}

function showUnanswered(e) {
    e.preventDefault()
    document.getElementById('unanswered').style.display = "block"
    document.getElementById('answered').style.display = "none"
}

function showAnswered(e) {
    e.preventDefault()
    document.getElementById('answered').style.display = "block"
    document.getElementById('unanswered').style.display = "none"
}

function mapStateToProps ({questions, authedUser}) {
    let unansweredIds = Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
        .filter((q) => {
            return questions[q].optionOne.votes.indexOf(authedUser) == -1 && questions[q].optionTwo.votes.indexOf(authedUser) == -1
        })
    let answeredIds = Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
        .filter((q) => {
            return questions[q].optionOne.votes.indexOf(authedUser) != -1 || questions[q].optionTwo.votes.indexOf(authedUser) != -1
        })
    return {
        unansweredIds: unansweredIds,
        answeredIds: answeredIds
    }
}

export default connect(mapStateToProps)(Home)