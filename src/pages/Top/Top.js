import React, { Component } from 'react';
import {Header} from 'components';
import {Button} from 'semantic-ui-react';
import style from './Top.css';
import {Link} from 'react-router-dom';

export default class Top extends Component {
  render() {
    return (
      <div className="page" style={style}>
        <Header/>
        <section className="main">
          <h1 className="title">TRACK</h1>
          <h1 className="title">EVERYWHERE</h1>
        </section>
        <footer>
          <Button as={Link} to="/signup" color="orange" size="massive">START TRACK</Button>
        </footer>
      </div>
    );
  }
}
