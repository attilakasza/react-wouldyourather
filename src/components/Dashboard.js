import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  state = {
    answered: false,
  }

  handleFilter = function(answered) {
    this.setState(function() {
      return {
        answered: answered
      };
    });
  }

  render() {
    const { answered } = this.state;
    const { authedUser, questions } = this.props;
    const questionArray = Object.keys(questions).map((key) => questions[key]);
    const filteredQuestionArray = questionArray.filter(function(question) {
      const contains = (
        question.optionOne.votes.indexOf(authedUser) > -1 ||
        question.optionTwo.votes.indexOf(authedUser) > -1
      );
      return answered ? contains : !contains;
    });
    const sortedQuestionArray = filteredQuestionArray.sort((a, b) => b.timestamp - a.timestamp);

    return (
      <div>
        <div className='dashboard-button-group'>
          <button
            className={!answered ? 'button-left active' : 'button-left'}
            onClick={() => this.handleFilter(false)}>
            Unanswered
          </button>
          <button
            className={answered ? 'button-right active' : 'button-right'}
            onClick={() => this.handleFilter(true)}>
            Answered
          </button>
        </div>
        <ul className='question-list'>
          {sortedQuestionArray.map((question) => (
            <li key={question.id}>
              <Question question={question} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users,
  }
}

export default connect(mapStateToProps)(Dashboard)