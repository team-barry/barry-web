import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import myStore from './redux/store';
import RoutePages from './routes';
import history from 'helpers/history';
import style from 'semantic-ui-css/semantic.css';

const store = myStore();
class App extends Component {
  render() {
    if(process.env.NODE_ENV === "development"){
      console.log(process.env);
    }
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App" style={style}>
            <RoutePages />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
