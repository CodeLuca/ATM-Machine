import React, { Component } from 'react';

import Header from '../Header/Header';
import { inject, observer } from "mobx-react"
import axios from 'axios';

import Store from '../../store'

const allowedPaths = ['/login', '/register'];

class App extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	loaded: false,
	  	authed: false,
	  	user: null
	  };
	}

	componentDidMount() {
		axios.get('/api/account/get')
			.then((result) => {
				Store.setAccount(result.data);
				if(!result.data.error) {
					this.setState({
						authed: true,
						user: result.data,
						loaded: true
					})
				} else {
					if(allowedPaths.indexOf(window.location.pathname.toLowerCase()) == -1) {
						window.location = '/login';
					} else {
						this.setState({
							loaded: true
						})
					}
				}
			})
	}
	render() {
		if(this.state.loaded) {
			return (
			  <div class='wrapper'>
			    <Header authed={this.state.authed} />

			    <main>
			      {this.props.children}
			    </main>
			  </div>
			);
		} else {
			return (
				<div></div>
			)
		}
	}
}

export default App;
