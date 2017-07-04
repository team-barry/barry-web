import React, { Component } from 'react';
import style from 'semantic-ui-css/semantic.min.css';
import RoutePages from 'routes';

class App extends Component {
  render() {
    return (
      <div className="App" style={style}>
        <RoutePages />
      </div>
    );
  }
}

export default App;
