import React, { Component } from 'react';
import 'whatwg-fetch';
import { inject, observer } from "mobx-react"
import './Login.scss'
import axios from 'axios';

const socket = io.connect('http://localhost:3000');

@inject('store') @observer
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      id: '',
      pin: ''
    };
  }

  _changeID(e) {
    this.setState({
      id: e.target.value
    })
  }

  _changePIN(e) {
    this.setState({
      pin: e.target.value
    })
  }

  submit() {
    axios.get('/api/login/' + this.state.id + '/' + this.state.pin)
      .then((result) => {
        if(result.data.error) {
          alert(result.data.error);
        } else {
          window.location = '/';
        }
      })
  }

  render() {
    return (
      <div class='login-container'>
        <div class='content'>
          <h1>Login</h1>
          <div class="inputs">
            <div class='input'>
              <div class='label'>Account Identifier:</div>
              <input type="text" onChange={this._changeID.bind(this)} />
            </div>
            <div class='input'>
              <div class='label'>PIN:</div>
              <input type="password" onChange={this._changePIN.bind(this)} />
            </div>
            <div class='input'>
              <div class='button' onClick={this.submit.bind(this)}>
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
