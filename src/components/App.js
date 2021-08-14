import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading-bar'
import Nav from './Nav'
import Home from './Home'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import Login from './Login'
import NotFound from './NotFound'
import ProtectedRoute from './ProtectedRoute'
import Logout from './Logout'

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }
  render() {
    if (!this.props.authedUser) {
      sessionStorage.removeItem("authentication")
    }
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App">
            <Nav />
            <Switch>
              <ProtectedRoute path='/' exact component={Home} />
              <ProtectedRoute path='/questions/:id' exact component={QuestionPage} />
              <ProtectedRoute path='/add' exact component={NewQuestion} />
              <ProtectedRoute path='/leaderboard' exact component={Leaderboard} />
              <Route path='/login' exact component={Login} />
              <Route path='/logout' exact component={Logout} />
              <ProtectedRoute path='*' component={NotFound} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser: authedUser
  }
}

export default connect(mapStateToProps, { handleInitialData })(App);
