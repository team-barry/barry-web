import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Header } from "components";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import authActions from "redux/modules/auth/actions";
import style from "./Top.css";
import { withRouter } from "react-router";

class Top extends Component {
  static PropTypes = {
    user: PropTypes.object,
    message: PropTypes.object,
    handleLogin: PropTypes.func,
    history: PropTypes.object.isRequired,
  };

  onClickStart = event => {
    // [TODO]
    // Add auth privider facebook
    this.props.history.push("/user");
  };

  render() {
    return (
      <div className="page" style={style}>
        <Header />
        <section className="main">
          <h1 className="title">TRACK</h1>
          <h1 className="title">EVERYWHERE</h1>
        </section>
        <section className="footer">
          <Button onClick={this.onClickStart} color="orange" size="massive">
            START TRACK
          </Button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Top));
