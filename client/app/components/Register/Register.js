import React, { Component } from 'react';
import 'whatwg-fetch';
import { inject, observer } from "mobx-react"
import './Register.scss'
import axios from 'axios';

const socket = io.connect('http://localhost:3000');

@inject('store') @observer
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      id: '',
      pin: '',
      confirmPin: '',
      name: '',
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

  _changeConfirmPIN(e) {
    this.setState({
      confirmPin: e.target.value
    })
  }

  _changeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  submit() {
    if(this.state.pin != this.state.confirmPin) {
      alert('Please make sure you have confirmed your PIN correctly');
      return;
    }
    axios.get(`/api/new-account/${this.state.id}/${this.state.pin}/${this.state.name}`)
      .then((result) => {
        console.log(result.data);
        if(result.data.error) {
          alert(result.data.error);
        } else {
          window.location = '/';
        }
      })
  }

  render() {
    return (
      <div class='register-container'>
        <div class='content'>
          <h1>Register</h1>
          <h3 style={{margin: 0, fontWeight: 'normal', lineHeight: 1, marginBottom: 20}}>£100.00 Sign up bonus!</h3>
          <div class="inputs">
            <div class='input'>
              <div class='label'>Account Identifier / Username:</div>
              <input type="text" onChange={this._changeID.bind(this)} />
            </div>
            <div class='input'>
              <div class='label'>Full Name:</div>
              <input type="text" onChange={this._changeName.bind(this)} />
            </div>
            <div class='input'>
              <div class='label'>PIN:</div>
              <input type="password" style={this.state.pin == this.state.confirmPin ? {'border': '3px solid green',} : {'border': '3px solid red'}} onChange={this._changePIN.bind(this)} />
            </div>
            <div class='input'>
              <div class='label'>Confirm PIN:</div>
              <input type="password" style={this.state.pin == this.state.confirmPin ? {'border': '3px solid green'} : {'border': '3px solid red'}} onChange={this._changeConfirmPIN.bind(this)} />
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

export default Register;
