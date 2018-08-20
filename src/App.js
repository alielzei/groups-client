import React from 'react';
import { Switch, HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import axios from 'axios';

import Home from 		 './Components/Home';
import Login from 	 './Components/Login';
import Register from './Components/Register';
import Create from 	 './Components/Create';

import './App.css';

import config from './config';
const API_URL = config.API_URL;

export default class App extends React.Component {

	signal = axios.CancelToken.source();
	state = { user: null };

	loadUser = () => {
		this.setState({ user: null }, () => {
			axios
				.create({ withCredentials: true })
				.get(`${API_URL}/loadUser`, {
					cancelToken: this.signal.token
				})
				.then(res => {	
					this.setState({ user: res.data })
				})
				.catch(err => {
					console.log(err);
				});
		});
	};

	componentWillMount(){
		this.loadUser();
	};

	componentWillUnmount(){ 
		this.signal.cancel('api is getting cancelled');
	};

	logoutUser = () => { //this needs a service maybe
		axios
			.create({ withCredentials: true })
			.get(`${API_URL}/logout`)
    	.then(res => {
    		this.loadUser();
    	})
    	.catch(error => {
	      console.log(error);
	    });
	};

	render(){
		//loading screen
		if(this.state.user === null){
			return <p>loading</p>
		}
		return (
				<Router>
					<div className="container-0">
						<div className="header">
							<Link to="/">
								<div className="proj-logo">
									<img alt="wagroups" src="./logo.svg" />
								</div>
							</Link>
							{this.state.user.loggedIn
								?
								<div className="header-buttons">
									<button><a onClick={this.logoutUser}>logout</a></button>
									<button><NavLink to="/create">create</NavLink></button>
								</div> 
								:
								<div className="header-buttons">
									<button><NavLink to="/register">signup</NavLink></button>
			      			<button><NavLink to="/login">login</NavLink></button>
								</div>
							}

						</div>
						<div className="container-1">
							<Switch>
								<Route exact path="/" component={Home} />
								{ !this.state.user.loggedIn && <Route path="/login" component={props => <Login {...props} onLogin={this.loadUser} />} /> }
								{ !this.state.user.loggedIn && <Route path="/register" component={Register} /> }
								{  this.state.user.loggedIn && <Route path="/create" component={Create} /> }
								<Route component={() => <p>No match</p> } />
							</Switch>
						</div>
					</div>
				</Router>
			);
	};

}