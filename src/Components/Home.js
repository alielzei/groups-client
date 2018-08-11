import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../Styles/Home.css';

import config from '../config';
const API_URL = config.API_URL;

class Home extends React.Component {

	constructor(props){
		super(props);
		this.mounted = false;
		this.state = {
			searchInput: '',
			resultTitle: 'test',
			groups: []
		};
	};

	componentDidMount(){
		this.mounted = true;
		this.initialLoad();
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	initialLoad(){
		axios.get(`${API_URL}/links`)
    	.then(res => {
    		if(this.mounted){ this.setState({ groups: res.data }) }
    	})
    	.catch(error => {
	      console.log(error)
	    })
	};

	submitSearch = (e) => {
		e.preventDefault();
		axios
			.get(`${API_URL}/search`, {
				params: {
					input: this.state.searchInput
				}
			})
	    .then(res => {
	     	this.setState({
	     		groups: res.data
	     	});
	    })
	    .catch(error => {
	      console.log(error)
	    })
	}

	render(){
		return(
			<div style={{"padding": "0"}} className="container-2">

				<form onSubmit={this.submitSearch} className="search-bar">

					<input 
						type="text" name="input" className="search-input" placeholder="look for a group..." 
						value={this.state.searchInput} 
						onChange={e => this.setState({ searchInput: e.target.value })} />

					<input type="submit" className="btn search-btn" value="search" />
					
				</form>

				<ul className="groups">
					{
						this.state.groups.map(group =>
							<li className="group" key={group.id}>
									<div className="group-img-container">
										<img 
											src={`http://chat.whatsapp.com/invite/icon/${group.group_id}`} 
											onerror=/>
									</div>
									<a
										className="group-id" 
										href={`http://chat.whatsapp.com/${group.group_id}`}>
										{group.title}
									</a>
							</li>
						)
					}
				</ul>

			</div>
		);
	}

}

export default Home;