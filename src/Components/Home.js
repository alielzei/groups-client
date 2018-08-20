import React from 'react';
import axios from 'axios';

import '../Styles/Home.css';

import config from '../config';
const API_URL = config.API_URL;

class GroupIcon extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			source: `http://chat.whatsapp.com/invite/icon/${props.groupId}`, 
		};
	};

	replaceSource = (e) => {
		e.preventDefault();
		const source = '/people-icon-100x100.png';
		this.setState({ source });
	};

	render() {
		return <img alt={this.props.group_id} onError={this.replaceSource} src={this.state.source} />;
	}
}

class Home extends React.Component {

	//TODO:
	//  (1)
	//  the black submit button:
	//  switch from magnifying glass icon
	//  to close (X) icon
	//  depending on the search input

	state = {
		searchInput: '',
		resultTitle: 'shared groups:',
		groups: []
	};

	componentDidMount(){
		this.initialLoad();
	}

	signal = axios.CancelToken.source();
	componentWillUnmount(){
		this.signal.cancel('api is getting cancelled');
	}

	initialLoad(){
		axios
			.get(`${API_URL}/links`, {
				cancelToken: this.signal.token
			})
    	.then(res => {
  			this.setState({ 
  				groups: res.data,
  				resultTitle: 'shared groups:'
  			}) 
    	})
    	.catch(error => {
	      console.log(error)
	    })
	};

	submitSearch = (e) => {
		e.preventDefault();
		this.setState({
			resultTitle: `loading...`
		});
		if(this.state.searchInput !== ''){
			axios
				.get(`${API_URL}/search`, {
					cancelToken: this.signal.token,
					params: {
						input: this.state.searchInput
					}
				})
		    .then(res => {
		    	this.setState({
		     		resultTitle: `search result for "${this.state.searchInput}":`,
		     		groups: res.data
		     	});
		    })
		    .catch(error => {
		      console.log(error)
		    })
		}else{
			this.initialLoad();
		}
	}

	render(){
		return(
			<div>

				<form onSubmit={this.submitSearch} className="search-bar">

					<input 
						type="text" name="input" className="search-input" placeholder="look for a group..." 
						value={this.state.searchInput} 
						onChange={e => this.setState({ searchInput: e.target.value })} />

					<input type="submit" className="btn search-btn" value="" />
					
				</form>

				<h2 className="results-title">{this.state.resultTitle}</h2>

				<ul className="groups">
					{
						this.state.groups.map(group =>
							<li className="group" key={group.id}>
									<div className="group-img-container">
										<GroupIcon groupId={group.group_id} />
									</div>
									<a
										className="group-title" 
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