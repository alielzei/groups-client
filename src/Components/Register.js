import React from 'react';
import axios from 'axios';

import config from '../config';
const API_URL = config.API_URL;

export default class Register extends React.Component{

	signal = axios.CancelToken.source();
	state = {
		username: '',
		password: '',
		error: null,
		loading: false
	};

	submit = (e) => {
		e.preventDefault();	
		axios
			.post(`${API_URL}/signup`, {
				username: this.state.username, 
				password: this.state.password
			},
			{
				cancelToken: this.signal.cancelToken
			})
    	.then(res => {
    		this.props.history.push('/login');
    	})
    	.catch(error => {
	    	this.setState({ error: error.response.data['msg'] });
	    });
	};

	componentWillUnmount(){
		this.signal.cancel('api is getting cancelled');
	};

	render(){
		return(
			<div className="container-2">
				<h2 id="title" className="page-title">signup</h2>
				<form onSubmit={this.submit} id="login-form" className="form">

					<p>username</p>

					<input 
						value={this.state.username} 
						onChange={(e) => this.setState({username: e.target.value})} 
						className="field" 
						name="username" />

					<p>password</p>

					<input 
						value={this.state.password} 
						onChange={(e) => this.setState({password: e.target.value})} 
						className="field" 
						name="password" 
						type="password" />

					<input className="btn submit-btn" type="submit" value="signup" />

				</form>

				{this.state.error &&
					<p>{this.state.error}</p>
				}
			</div>
		);
	};
}