import React, { Component } from 'react';
import 'whatwg-fetch';
import { inject, observer } from "mobx-react"
import './ChangePin.scss'
import axios from 'axios';

const socket = io.connect('http://localhost:3000');

@inject('store') @observer
class ChangePin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: ''
    };
  }

  _changePIN(e) {
    this.setState({
      pin: e.target.value
    })
  }

  submit() {
    axios.get('/api/account/changepin/' + this.state.pin)
      .then((result) => {
        if(result.data.error) {
          alert(result.data.error);
        } else {
          alert('Pin Changed.')
          window.location = '/';
        }
      })
  }

  render() {
    return (
      <div class='changepin-container'>
        <div class='info'>
          <div class='section'>
            <div class='title'>Welcome</div>
            <div class='desc'>{this.props.store.account.name}</div>
          </div>
          <div class='section'>
            <div class='title'>Account Balance</div>
            <div class='desc'>£{this.props.store.account.balance.toFixed(2)}</div>
          </div>
        </div>
        <div class='content'>
          <h1>Change Pin</h1>
          <div class="inputs">
            <div class='input'>
              <div class='label'>New Pin:</div>
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

export default ChangePin;
