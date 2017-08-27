import React, {Component} from 'react';
import style from './User.css';
import {UserHeader, UserMap} from 'containers';

export default class User extends Component {
  render() {
    return (
      <div className="page" style={style}>
        <UserHeader />
        <section className="main">
          <UserMap />
        </section>
      </div>
    )
  };
}
