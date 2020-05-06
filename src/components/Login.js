import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser, clearAuthedUser } from '../actions/authedUser'

class Login extends Component {
  state = {
    userId: null,
    home: false,
  }

  handleSelection = function(e) {
    const userId = e.target.value;
    this.setState(function(previousState) {
      return {
        ...previousState,
        userId,
      };
    });
  }

  handleLogin = function(e) {
    this.props.dispatch(setAuthedUser(this.state.userId));
    this.setState(function(previousState) {
      return {
        ...previousState,
        home: true,
      };
    });
  }

  componentDidMount() {
    this.props.dispatch(clearAuthedUser())
  }

  render() {
    const { userId, home } = this.state;
    const { history, users } = this.props;
    const selectedUser = userId ? userId : -1;
    const avatarURL = userId ? users[userId].avatarURL : 'avatar.png';

    if(home) {
      const redirect = history.location.state;
      if (redirect != null) {
        return <Redirect to={redirect} push={true} />
      }
      return <Redirect to='/' />
    }

    return (
      <div>
        <div className='login'>
          <img className='login-avatar' src={avatarURL} alt={`Avatar of ${userId}`} />
          <div className='login-select'>
            <select value={selectedUser} onChange={(e) => this.handleSelection(e)}>
              <option value={-1} disabled>Select user...</option>
              {Object.keys(users).map(function (key) {
                return (
                  <option value={users[key].id} key={key}>{users[key].id}</option>
                );
              })}
            </select>
          </div>
          <button
            className='login-button'
            disabled={userId === null}
            onClick={(e) => this.handleLogin(e)}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  }
}

export default withRouter(connect(mapStateToProps)(Login))