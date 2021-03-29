import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLead } from "../../actions/leads";

export class Form extends Component {
  state = {
    name: "",
    email: "",
    message: "",
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  static propTypes = {
    addLead: PropTypes.func.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = this.state;
    const lead = { name, email, message };
    this.props.addLead(lead);
    this.setState({
      name: "",
      email: "",
      message: "",
    });
  };

  render() {
    const { name, email, message } = this.state;

    return (
      <div>
        <h1>Add Lead</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.onChange}
                value={name}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Message
            </label>
            <div className="col-sm-10">
              <textarea
                type="text"
                className="form-control"
                name="message"
                onChange={this.onChange}
                value={message}
              ></textarea>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <button type="submit" className="float-right btn btn-primary">
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addLead })(Form);
