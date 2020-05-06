import React, { Component, Fragment } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions'
import Nav from './Nav'
import Dashboard from './Dashboard'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Login from './Login'
import NotFound from './NotFound'
import ProtectedRoute from '../utils/ProtectedRoute'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { loggedIn } = this.props;

    return (
      <HashRouter>
        <Fragment>
          <div className='container'>
            <Nav />
              <div>
                <Switch>
                  <ProtectedRoute path='/' exact component={Dashboard} loggedIn={loggedIn} />
                  <ProtectedRoute path='/leaderboard' exact component={Leaderboard} loggedIn={loggedIn} />
                  <ProtectedRoute path='/add' exact component={NewQuestion} loggedIn={loggedIn} />
                  <ProtectedRoute path='/questions/:id' exact component={QuestionPage} loggedIn={loggedIn} />
                  <Route path='/login' exact component={Login} />
                  <Route component={NotFound} />
                </Switch>
              </div>
          </div>
        </Fragment>
      </HashRouter>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loggedIn: authedUser !== null,
  }
}

export default connect(mapStateToProps)(App);