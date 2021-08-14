import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeUser } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    state = {
        usr: '',
        toHome: false
    }
    handleChange = (e) => {
        const usr = e.target.value

        this.setState(() => ({
            usr
        }))
    }
    signin = (e, users) => {
        e.preventDefault()
        const { usr } = this.state
        if (usr in users) {
            // succeed to login
            this.props.changeUser(usr)
            sessionStorage.setItem("authentication", usr)
            this.setState(() => ({
                usr: '',
                toHome: true
            }))
            
        } else {
            // fail to login
            alert('please try again with correct credentials!')
            this.setState(() => ({
                usr: ''
            }))
        }
    }
    render() {
        const { usr, toHome } = this.state

        if (toHome === true) {
            const { location } = this.props;
            const { state } = location;

            if (state && state.from) {
                return <Redirect to={state.from} />
            }
            // else go to home
            else {
                return <Redirect to='/' />
            }
            // return <Redirect to={this.props.from} />
        }

        return(
            <div>
                <div>
                    <h3>Welcome to the Would You Rather App!</h3>
                    <p>Please Sign in to continue</p>
                </div>
                <div>
                    <img src='/images/welcome.jpg' height="100" weight="100" />
                    <h1>Sign in</h1>
                    <form>
                        <input id="username" type="text" placeholder="Username" value={usr} onChange={this.handleChange} />
                        <button type="button" onClick={(e) => {this.signin(e, this.props.users)}}>Sign in</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({users, from}) {
    return {
        users: users,
        from: from
    }
}

export default connect(mapStateToProps, { changeUser })(Login)