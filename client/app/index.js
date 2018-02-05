import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import { Provider } from 'mobx-react';

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';
import Withdraw from './components/Withdraw/Withdraw';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

import Store from './store';

import './styles/styles.scss';

render((
  <Provider store={Store} >
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/withdraw" component={Withdraw}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route component={NotFound}/>
        </Switch>
      </App>
    </Router>
  </Provider>
), document.getElementById('app'));
