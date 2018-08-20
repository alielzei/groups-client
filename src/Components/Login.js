import React from 'react';
import axios from 'axios';

import config from '../config';
const API_URL = config.API_URL;

export default class Login extends React.Component{

	signal = axios.CancelToken.source();
	state = {
		username: '',
		password: '',
		error: null,
		loading: false
	};

	componentWillUnmount(){ 
		this.signal.cancel('api is getting cancelled');
	};

	submit = (e) => {
		e.preventDefault();
		axios
			.create({ withCredentials: true })
			.post(`${API_URL}/login`, {
				username: this.state.username,
				password: this.state.password
			},
			{
				cancelToken: this.signal.cancelToken
			})
    	.then(res => {
    		this.props.onLogin();
    		this.props.history.push('/');
    	})
    	.catch(error => {
    		if(error.response){
		      this.setState({ error: error.response.data['msg'] });
    		}else{
    			this.setState({ error: 'unknown error , line 47 in Login.js' });
    		}
	    });
	};

	render(){
		return(
			<div className="container-2">
				<h2 id="title" className="page-title">login</h2>

				<form onSubmit={this.submit} id="login-form" className="form">

					<p>username</p>

					<input 
						placeholder="ali"
						value={this.state.username} 
						onChange={(e) => this.setState({ username: e.target.value })} 
						className="field" />

					<p>password</p>

					<input 
						placeholder="Keyboard_Catz12$"
						value={this.state.password} 
						onChange={(e) => this.setState({ password: e.target.value })} 
						className="field" 
						type="password" />

					<input className="btn submit-btn" type="submit" value="login" />

				</form>

				{this.state.error &&
					<p>{this.state.error}</p>
				}

			</div>
		);
	};
}