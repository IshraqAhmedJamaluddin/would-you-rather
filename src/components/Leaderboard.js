import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
    render() {
        const { leaders, users } = this.props
        return(
            <div>
                {leaders.map((leader) => 
                    <div key={leader}>
                        <img className="left" src={`images/${users[leader].avatarURL}`} alt={users[leader].name} width="100" height="100" />
                        <div className="middle">
                            <h2>{users[leader].name}</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Answered questions</td>
                                        <td>{Object.keys(users[leader].answers).length}</td>
                                    </tr>
                                    <tr>
                                        <td>Created questions</td>
                                        <td>{users[leader].questions.length}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="right">
                            <p>Score</p>
                            <p>{Object.keys(users[leader].answers).length + users[leader].questions.length}</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps ({users}) {
    let leaders = Object.keys(users)
        .sort((a,b) => (Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length))
    return {
        leaders: leaders,
        users: users
    }
}

export default connect(mapStateToProps)(Leaderboard)