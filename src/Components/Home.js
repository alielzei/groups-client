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
			links: []
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
    		if(this.mounted){ this.setState({ links: res.data }) }
    	})
    	.catch(error => {
	      console.log(error)
	    })
	};

	submitSearch = (e) => {
		e.preventDefault();
		axios
			.get(`http://wagroups.herokuapp.com/search`, {
				params: {
					input: this.state.searchInput
				}
			})
	    .then(res => {
	     	this.setState({
	     		links: res.data
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

				<ul className="links">
					{
						this.state.links.map(link =>
							<li className="link" to={`/link/${link.id}`} key={link.id}>
									<h3 className="link-title">{link.title}</h3>
									<a href={link.link} >{link.link}</a>
							</li>
						)
					}
				</ul>

			</div>
		);
	}

}

export default Home;