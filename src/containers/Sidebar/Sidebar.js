import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Card, Feed} from 'semantic-ui-react'
import * as authActions from 'redux/modules/auth';
import * as mapActions from 'redux/modules/map';
import TrackingCard from 'components/TrackingCard/TrackingCard';
import styles from './Sidebar.css'
import TrackingCardList from 'containers/TrackingCardList/TrackingCardList';

const Sidebar = () => {
  return (
    <div className='sideabr' style={styles}>
      <TrackingCardList />
    </div>
  )
}

export default Sidebar;
