import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    let register = (
      <a href="/register">Register</a>
    )

    let logout = (
      <a href="/logout">Card Return</a>
    )

    return (
      <div class="header">
        <div class="left">
          <a href='/'>
            ATM
          </a>
        </div>
        <div class="right">
          {this.props.authed ? logout : register}
        </div>
      </div>
    );
  }
}
export default Header;
