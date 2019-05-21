import React, { useEffect, userReducer } from "react"
import { withAuthenticator } from "aws-amplify-react"
import { Auth } from "aws-amplify"
import logo from "./logo.svg"
import "./App.css"

const state = {
  username: "",
  password: "",
  email: ""
}
function reducer(state, action) {
  switch (action.type) {
    case "SETFORM":
      return { ...state, [action.formType]: action.formInput }
  }
}
async function signUp() {
  await Auth.signUp({
    username: formState.username,
    password: formState.password,
    attributes: { email: formState.email }
  })
}
// dispatch({type: 'SetForm', formType: 'username',formInput: value})
function App() {
  const [formState, dispatch] = userReducer(reducer, state)
  async function checkUser() {
    const user = await Auth.currentAuthenticatedUser()
    console.log("user:", user)
  }
  useEffect(() => {
    checkUser()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input
          placeholder="username"
          onChange={e =>
            dispatch({
              type: "SetForm",
              formType: "username",
              formInput: value
            })
          }
        />
      </header>
    </div>
  )
}

export default withAuthenticator(App, { includeGreetings: true })
