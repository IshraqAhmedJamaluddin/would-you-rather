import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeUser } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class Logout extends Component {
    state = {
        toLoginPage: false
    }
    componentDidMount() {
        this.logout()
    }
    logout = () => {
        this.props.dispatch(changeUser(''))
        sessionStorage.removeItem("authentication")
        this.setState(() => ({
            toLoginPage: true
        }))
    }
    render() {
        const { toLoginPage } = this.state

        if (toLoginPage === true) {
            return <Redirect to='/login' />
        }

        return(
            <div>
                Logging you out
            </div>
        )
    }
}

export default connect()(Logout)