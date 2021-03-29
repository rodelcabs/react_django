import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  handleChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { username, password } = this.state;
    return (
      <div className="col-md-6 offset-md-3">
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>username</label>
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control"
              name="username"
              value={username}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              onChange={this.handleChange}
              type="password"
              className="form-control"
              name="password"
              value={password}
            />
          </div>
          <button type="submit" className="float-right btn btn-primary">
            Login
          </button>
          <div>
            <small className="form-text text-muted">
              Don't have an account? <Link to="/register">Register here</Link>
            </small>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
