import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Dropdown, Menu, Icon} from 'semantic-ui-react';
import * as authActions from 'redux/modules/auth';
import * as mapActions from 'redux/modules/map';

class UserHeader extends Component {
  static PropTypes = {
    user: PropTypes.object,
    signout: PropTypes.func,
  }

  hundleSignout = (event) => {
    event.preventDefault();
    this.props.stopUpdatePosition();
    this.props.signout();
  }

  render() {
    return (
      <Menu size="huge" compact={false}>
        <Menu.Item onClick={this.props.parentFunc}>
          <Icon name="content" size="large" />
        </Menu.Item>
        <Menu.Menu position="right">
          <Dropdown text={this.props.user.email} pointing className='link item'>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Icon name="setting" />
                User Edit
              </Dropdown.Item>
              <Dropdown.Item onClick={this.hundleSignout}>
                <Icon name="sign out" />
                Sign out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    message: state.auth.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(mapActions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserHeader))
