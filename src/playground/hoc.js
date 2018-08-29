import React from 'react'
import ReactDOM from 'react-dom'

const User = (props) => (
  <div>
    <h1>Info</h1>
    <p>Name: {props.name}</p>
  </div>
)

const requireAuthentication = (WrappedComponent) => {

  return (props) => (
    <div>
      {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>You are not authenticated</p>}
    </div>
  )
}

const AuthInfo = requireAuthentication(User)

ReactDOM.render(<AuthInfo isAuthenticated={true} name="Sixtus Innocent" />, document.getElementById('app'))