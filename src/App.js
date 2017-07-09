import React, { Component } from 'react';
import {Provider} from 'react-redux';
import myStore from './redux/store';
import RoutePages from './routes';
import style from 'semantic-ui-css/semantic.min.css';

const store = myStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App" style={style}>
          <RoutePages />
        </div>
      </Provider>
    );
  }
}

export default App;
