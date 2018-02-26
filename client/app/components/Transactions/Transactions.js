import React, { Component } from 'react';
import 'whatwg-fetch';
import { inject, observer } from "mobx-react"
import './Transactions.scss'

import axios from 'axios';

@inject('store') @observer
class Transactions extends Component {
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
    axios.get('/api/account/transactions/' + this.state.total)
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
      <div class='transactions-container'>
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
          <div class='header'>
            <span class='header-title'>Transactions</span>
          </div>
          <div class="table">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.store.account.transactions.map((transaction, i) => {
                    return (
                      <tr>
                        <td data-column="Type">{transaction.type}</td>
                        <td data-column="Amount">£{Number(transaction.amount).toFixed(2)}</td>
                        <td data-column="Date">{transaction.date}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Transactions;
