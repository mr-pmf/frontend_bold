import React, { Component } from "react";
import "./Views.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Login_Successful: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    //event.preventDefault();

    this.setState({ Login_Successful: true });
  }

  render() {
    if (this.state.Login_Successful === true) {
      this.props.history.push({
        pathname: "/main"
        /*state: {
          Bottle_Added: false
        }*/
      });
    }
    return (
      <div>
        <div className="form_login">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label className="bolder">Username</label>
              <input
                style={{ textAlign: "center" }}
                type="text"
                name="username"
                placeholder="User"
              />
              <div className="espaco_span" />
              <label className="bolder">Password</label>
              <input
                style={{ textAlign: "center" }}
                type="password"
                name="password"
                placeholder="******"
              />
            </div>
            <div className="espaco_span" />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
