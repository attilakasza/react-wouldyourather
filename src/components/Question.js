import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions/questions'

class Question extends Component {
  state = {
    option: '',
  }

  handleOptionChange(option) {
    this.setState(() => ({ option }))
  }

  handleOptionClicked = () => {
    const { answerQuestion, authedUser, question } = this.props;
    answerQuestion(authedUser, question.id, this.state.option);
  }

  render() {
    const { authedUser, question, users, page } = this.props;
    const answers = Object.keys(users[authedUser].answers);
    const answered = answers.indexOf(question.id) > -1 ? true : false;
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const percentOptionOneVotes = (optionOneVotes / totalVotes).toFixed(2) * 100;
    const percentOptionTwoVotes = (optionTwoVotes / totalVotes).toFixed(2) * 100;

    return (

      <div className='question'>
        <div className='question-head'>
          <img
            src={`${users[question.author].avatarURL}`}
            alt={`Avatar of ${question.author}`}
            className='question-avatar'
          />
          <div className='question-title'>
            <div className='question-author'><span>{question.author}</span> asks</div>
            <span className='question-subtitle'>Would You Rather...</span>
          </div>
        </div>

        {page ?

          <div className='question-page'>
            {answered ?
              <div className='question-stat'>
                <div className={question.optionOne.votes.indexOf(authedUser) > -1 ?
                  'question-option-selected' : 'question-option-notselected'}>
                  <div>
                    {question.optionOne.text}
                  </div>
                  <span>
                    Votes: {question.optionOne.votes.length} ({percentOptionOneVotes}%)
                  </span>
                </div>
                <div className={question.optionTwo.votes.indexOf(authedUser) > -1 ?
                  'question-option-selected' : 'question-option-notselected'}>
                  <div>
                    {question.optionTwo.text}
                  </div>
                  <span>
                    Votes: {question.optionTwo.votes.length} ({percentOptionTwoVotes}%)
                  </span>
                </div>
              </div>
            :
              <div className='question-options'>
                <form>
                  <div className='question-option'>
                    <label>
                      <input type='radio' value='optionOne'
                        checked={this.state.option === 'optionOne'}
                        onChange={() => this.handleOptionChange('optionOne')} />
                      {question.optionOne.text}
                    </label>
                  </div>
                  <div className='question-option'>
                    <label>
                      <input type='radio' value='optionTwo'
                        label={question.optionTwo.text}
                        checked={this.state.option === 'optionTwo'}
                        onChange={() => this.handleOptionChange('optionTwo')} />
                      {question.optionTwo.text}
                    </label>
                  </div>
                </form>
                <button className='question-submit' disabled={this.state.option === ''} onClick={this.handleOptionClicked}>Submit</button>
              </div>
            }
          </div>
          :
          <div className='question-body'>
            <span>{question.optionOne.text}</span>
            <span>or...</span>
            <div className='question-poll'>
              <button><Link to={`/questions/${question.id}`}>View Poll</Link></button>
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  }
}

export default connect(mapStateToProps, actions)(Question);