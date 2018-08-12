import React from 'react';
import axios from 'axios';

import config from '../config';
const API_URL = config.API_URL;

class Create extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			title: '',
			link: '',
			error: null
		}
	}
	componentDidMount(){
		if(!this.props.loggedIn){
			this.props.history.push('/login');
		}
	};

	submit = (e) => {
		e.preventDefault();
		axios
			.create({ withCredentials: true, })
			.post(`${API_URL}/add`, {
				title: this.state.title,
				link: this.state.link
			})
    	.then(res => {
    		this.props.history.push('/');
    	})
    	.catch(error => {
	      this.setState({error: error.response.data['msg']})
	    })
	};

	render(){
		return ( 
			<div className="container-2">
				<h2 id="title" className="page-title"> add your group </h2>
				<form onSubmit={this.submit} id="create-form" className="form">

					<p>title</p>

					<input
						placeholder="the name of your group"
						className="field" 
						onChange={e => this.setState({title: e.target.value})} />

					<p>link</p>

					<input
						placeholder="https://chat.whatsapp.com/y0urgr0upId"
						className="field" 
						onChange={e => this.setState({link: e.target.value})} />

					<input className="btn submit-btn" type="submit" value="add" />
				</form>

				{this.state.error &&
					<p>{this.state.error}</p>
				}

			</div>
		);
	};
}

export default Create;