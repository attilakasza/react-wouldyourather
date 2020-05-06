import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    home: false,
  }

  handleChange = function(e, optionIndex) {
    const option = e.target.value;
    this.setState(function(previousState) {
      return optionIndex === 1
        ? { ...previousState, 'optionOne': option }
        : { ...previousState, 'optionTwo': option };
    });
  }

  handleSubmit = function(e) {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddQuestion(optionOne, optionTwo));

    this.setState(function(previousState) {
      return {
        ...previousState,
        home: true,
      };
    })
  }

  render() {
    const { optionOne, optionTwo, home } = this.state;

    if (home === true) {
      return <Redirect to='/' />
    }

    return (
      <div className='newquestion'>
        <span className='newquestion-title'>Create New Question</span>
        <span className='newquestion-subtitle'>Would You Rather...</span>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className='newquestion-option'>
            <textarea
              placeholder='Type first option'
              value={optionOne}
              onChange={(e) => this.handleChange(e, 1)} />
          </div>
          <span>or</span>
          <div className='newquestion-option'>
            <textarea
              placeholder='Type second option'
              value={optionTwo}
              onChange={(e) => this.handleChange(e, 2)} />
          </div>
          <button
            className='newquestion-submit'
            type='submit'
            disabled={optionOne === '' || optionTwo === ''}>
            Submit
          </button>
        </form>
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

export default connect(mapStateToProps)(NewQuestion)