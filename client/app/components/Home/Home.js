import React, { Component } from 'react';
import 'whatwg-fetch';
import { inject, observer } from "mobx-react"
import './Home.scss'

const socket = io.connect('http://localhost:3000');

@inject('store') @observer
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  redirect(location) {
    window.location = '/' + location;
  }

  componentDidMount() {
    // fetch('/api/counters')
    //   .then(res => res.json())
    //   .then(json => {
    //     this.setState({
    //       counters: json
    //     });
    //   });

    // socket.on('news', function (data) {
    //   console.log(data);
    //   socket.emit('my other event', { my: 'data' });
    // });
  }

  render() {
    return (
      <div class='home-container'>
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
        <div class='buttons'>
          <div class='button' onClick={this.redirect.bind(this, 'withdraw')}>Cash Withdraw</div>
          <div class='button'>Deposit</div>
          <div class='button'>Transactions</div>
          <div class='button'>Settings</div>
          {/** <div class='button'>
            <span>
              Quick Cash
            </span>
            <span style={{'font-weight': 'normal', 'margin-left': 7}}>
              £20
            </span>
          </div> **/}
        </div>
      </div>
    );
  }
}

export default Home;
