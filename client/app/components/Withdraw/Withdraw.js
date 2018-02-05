import React, { Component } from 'react';
import 'whatwg-fetch';
import { inject, observer } from "mobx-react"
import './Withdraw.scss'

import axios from 'axios';

@inject('store') @observer
class Withdraw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0
    };
  }

  _redirect(location) {
    window.location = '/' + location;
  }

  _buttonClick(amount) {
    this.setState({
      total: this.state.total += amount
    })
  }

  submit() {
    axios.get('/api/account/withdraw/' + this.state.total)
      .then((res) => {
        if(res.data.error) {
          alert(res.data.error);
          return;
        } else {
          this._redirect('')
        }
      });
  }

  render() {
    return (
      <div class='withdraw-container'>
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
          <div class='total'>
            <span class='total-amount'>£{this.state.total.toFixed(2)}</span>
          </div>
          <div class="buttons">
            <div class='button' onClick={this._buttonClick.bind(this, 10)}>+ £10</div>
            <div class='button' onClick={this._buttonClick.bind(this, 20)}>+ £20</div>
            <div class='button' onClick={this._buttonClick.bind(this, 50)}>+ £50</div>
            <div class='button' onClick={this._buttonClick.bind(this, 100)}>+ £100</div>
            <div class='button' onClick={this._redirect.bind(this, '')}>Home</div>
            <div class='submit' onClick={this.submit.bind(this)}>Withdraw</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Withdraw;
