import React, { Component } from 'react'
import { connect } from 'react-redux'

class NotFound extends Component {
    render () {
        const { authedUser } = this.props;
        return (
            <h1>404 Not Found</h1>
        )
    }
}

export default connect()(NotFound)