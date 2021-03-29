import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withAlert } from "react-alert";
import { connect } from "react-redux";

export class Alerts extends Component {
  componentDidUpdate(prevProps) {
    const { error, message, alert } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) {
        alert.error(`Name: ${error.msg.name.join()}`);
      }
      if (error.msg.email) {
        alert.error(`Email: ${error.msg.email.join()}`);
      }
      if (error.msg.message) {
        alert.error(`Email: ${error.msg.message.join()}`);
      }
      if (error.msg.non_field_errors) {
        alert.error(error.msg.non_field_errors);
      }
      if (error.msg.username) {
        alert.error(error.msg.username.join());
      }
    }

    if (message !== prevProps.message) {
      if (message.leadDeleted) alert.success(message.leadDeleted);
      if (message.leadAdded) alert.success(message.leadAdded);
      if (message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
    }
  }

  render() {
    return <Fragment />;
  }
}

Alerts.propTypes = {
  error: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
