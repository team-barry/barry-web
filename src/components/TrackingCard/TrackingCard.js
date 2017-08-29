import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Feed} from 'semantic-ui-react'
import {formatLatLng, formatDate} from 'helpers/format';
import './TrackingCard.css'

class TrackingCard extends Component {
  static PropTypes = {
    coordinate: PropTypes.object.isRequried
  }

  render() {
    const {created_at, longitude, latitude} = this.props.coordinate;
    return (
      <Feed.Event>
        <Feed.Content>
          <Feed.Date content={formatDate(created_at)} />
          <Feed.Summary>
            <p>({formatLatLng(longitude)}, {formatLatLng(latitude)})</p>
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    )
  }
}

export default TrackingCard
