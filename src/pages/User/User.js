import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import authActions from "redux/modules/auth/actions";
import style from "./User.css";
import { UserHeader, UserMap, UserSidebar } from "containers";
import { Sidebar, Segment, Menu } from "semantic-ui-react";

class User extends Component {
  constructor(props) {
    super(props);

    console.log("constructor", props.visibles);
    this.state = {
      visibles: {
        ...props.visibles,
      },
    };
  }

  static PropTypes = {
    visibles: PropTypes.object.isRequired,
    changeOptions: PropTypes.func.isRequired,
  };

  toggles = () => {
    return {
      sidebar: () => {
        const visibles = {
          ...this.state.visibles,
          sidebar: !this.state.visibles.sidebar,
        };
        this.setState({
          ...this.state,
          visibles,
        });
        this.props.changeOptions({ visibles: visibles });
      },
      bows: () => {
        const visibles = {
          ...this.state.visibles,
          bows: !this.state.visibles.bows,
        };
        this.setState({
          ...this.state,
          visibles,
        });
        this.props.changeOptions({ visibles: visibles });
      },
    };
  };

  render() {
    const { visibles } = this.state;
    return (
      <div className="page" style={style}>
        <UserHeader visibles={visibles} toggles={this.toggles()} />
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="overlay" visible={visibles.sidebar} icon="labeled">
            <UserSidebar />
          </Sidebar>
          <Sidebar.Pusher className="main">
            <UserMap visibleBows={visibles.bows} />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    visibles: state.auth.visibles,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
