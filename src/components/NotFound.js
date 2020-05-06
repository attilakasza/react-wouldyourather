import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class NotFound extends Component {
  render() {
    return (
      <div className='notfound'>
        <h1 className='notfound-title'> 
          <span className='notfound-404'>404</span> 
          <span>Page not found</span> 
        </h1>
        <h2 className='notfound-subtitle'>The page you're looking for doesn't exist.</h2>
        <Link className='notfound-link'to='/'>Go to Home</Link>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  }
}

export default connect(mapStateToProps)(NotFound)