import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Dropdown, Menu, Container, Button, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import * as authActions from 'redux/modules/auth';

class UserHeader extends Component {
  static PropTypes = {
    user: PropTypes.object,
    signout: PropTypes.func,
  }
  
  hundleSignout = (event) => {
    event.preventDefault();
    this.props.signout();
  }
  
  render() {
    return (
      <Menu size="large">
        <Container>
          <Menu.Item as={Link} to="/user" name="Barry" />
          
          <Menu.Menu position="right">
            <Dropdown text={this.props.user.email} pointing className='link item'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Icon name="setting" />
                  User Edit
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>
              <Button onClick={this.hundleSignout}>Sign out</Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
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
    ...bindActionCreators(authActions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserHeader))
