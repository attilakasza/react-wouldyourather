import React from 'react'
import { connect } from 'react-redux'

function Leaderboard(props) {
  const { users } = props;
  const userArray = Object.keys(users).map((u) => users[u]);
  const sortedUserArray = userArray.sort((one, two) => {
    const totalOne = Object.keys(one.answers).length + one.questions.length;
    const totalTwo = Object.keys(two.answers).length + two.questions.length;
    return totalTwo - totalOne;
  })

  return (
    <div className='leaderboard'>
      <ul className='leaderboard-list'>
        {sortedUserArray.map((user) => (
          <li key={user.id}>
            <div className='leaderboard-user'>
              <img
                src={user.avatarURL}
                alt={`Avatar of ${user.name}`}
                className='leaderboard-avatar'
              />
              <div className='leaderboard-user-stats'>
                <span className='leaderboard-user-name'>{user.name}</span>
                <span>Asked: {Object.keys(user.questions).length}</span>
                <span>Answered: {Object.keys(user.answers).length}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function mapStateToProps({ users }) {
  return {
    users,
  }
}

export default connect(mapStateToProps)(Leaderboard)