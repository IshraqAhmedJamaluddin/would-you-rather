import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Nav extends Component {
    render () {
        const { authedUser } = this.props;
        return (
            <nav>
                <ul className="home">
                    <li className="left"><Link to="/">Home</Link></li>
                    <li className="left"><Link to="/add">New Question</Link></li>
                    <li className="left"><Link to="/leaderboard">Leaderboard</Link></li>
                    {authedUser &&
                        <React.Fragment>
                            <li className="right"><Link to='/logout'>Logout</Link></li>
                            <li className="right"><img src={`/images/${authedUser.avatarURL}`} alt={authedUser.name} /></li>
                            <li className="right">Hello, {authedUser.name}</li>
                        </React.Fragment>
                    }
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({authedUser, users}) {
    return {
        authedUser: users[authedUser]
    }
}

export default connect(mapStateToProps)(Nav)