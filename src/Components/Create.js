import React from 'react';
import axios from 'axios';

class Create extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			title: '',
			link: ''
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
			.post(`http://localhost:3001/add`, {
				title: this.state.title,
				link: this.state.link
			})
    	.then(res => {
    		this.props.history.push('/');
    	})
    	.catch(error => {
	      console.log(error)
	    })
	};

	render(){
		return ( 
			<div className="container-2">
				<h2 id="title" className="page-title"> create grp </h2>
				<form onSubmit={this.submit} id="create-form" className="form">

					<p>title</p>

					<input 
						className="field" 
						name="title" 
						onChange={e => this.setState({title: e.target.value})} />

					<p>link</p>

					<input 
						className="field" 
						name="link" 
						onChange={e => this.setState({link: e.target.value})} />

					<input className="btn" id="submit-btn" type="submit" value="add" />
				</form>
			</div>
		);
	};
}

export default Create;