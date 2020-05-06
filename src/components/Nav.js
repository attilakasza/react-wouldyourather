import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Nav(props) {
  const { authedUser, users } = props
  const avatarURL = authedUser ? users[authedUser].avatarURL : 'avatar.png';
  const loggedIn = authedUser !== null

  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='nav-active'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' exact activeClassName='nav-active'>Leaderboard</NavLink>
        </li>
        <li>
          <NavLink to='/add' exact activeClassName='nav-active'>New Question</NavLink>
        </li>
        {loggedIn ?
          <li>
             <div className='nav-user'> 
                <img className='nav-avatar' src={avatarURL} alt={`Avatar of ${authedUser}`} />
                <div className="nav-username">
                  <span>{authedUser}</span>
                  <NavLink to='/login' exact className='nav-logout'>Logout</NavLink>
                </div>
              </div> 
          </li> 
        :
          <li>
            <NavLink to='/login' exact activeClassName='nav-active'>Login</NavLink>
          </li>
        }
      </ul>
    </nav>
  );
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  }
}

export default connect(mapStateToProps, null, null, { pure: false })(Nav)