import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
      this.props.createMessage({ passwordsNotMatch: "Passwords do not match" });
    } else {
      const newUser = {
        username,
        password,
        email,
      };
      this.props.register(newUser);
    }
  };

  handleChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, email, password, password2 } = this.state;
    return (
      <div className="col-md-6 offset-md-3">
        <h1>Register</h1>
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
            <label>Email</label>
            <input
              onChange={this.handleChange}
              type="email"
              className="form-control"
              name="email"
              value={email}
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
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              onChange={this.handleChange}
              type="password"
              className="form-control"
              name="password2"
              value={password2}
            />
          </div>
          <button type="submit" className="float-right btn btn-primary">
            Register
          </button>
          <div>
            <small className="form-text text-muted">
              Already have an account? <Link to="/login">Login here</Link>
            </small>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);
