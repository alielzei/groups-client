import React from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import axios from 'axios';

import Home from 		 './Components/Home';
import Login from 	 './Components/Login';
import Register from './Components/Register';
import Create from 	 './Components/Create';
import Group from 	 './Components/Group';

import './App.css';

import config from './config';
const API_URL = config.API_URL;

export default class App extends React.Component {

 	constructor(props){

		super(props);
		this.state = {
			userLoggedIn: false
		};
	};

	componentWillMount(){
		axios
			.create({ withCredentials: true })
			.get(`${API_URL}/loadUser`)
			.then(res => {
				if(res.data.loggedIn === true){
					this.setState({
						userLoggedIn: true
					});
				}
			})
			.catch(err => {
				console.log(err);
			})
	};

	logoutUser = () => {
		axios
			.create({ withCredentials: true })
			.get(`${API_URL}/logout`)
    	.then(res => {
    		this.setState({
					userLoggedIn: false
				})
    	})
    	.catch(error => {
	      console.log(error)
	    })
	};

	render(){
		return (
			<Router>
				<div className="container-0">
					<div className="header">
						<Link to="/">
							<div className="proj-logo">
								<img src="./logo.svg" />
							</div>
						</Link>
						{this.state.userLoggedIn
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

						<Route 
							exact path="/" 
							component={ props => <Home
								{...props}
								loggedIn={this.state.userLoggedIn}/> }
						/>

						<Route 
							path="/login" 
							component={ props => <Login
								{...props}
								onLogin={() => this.setState({ userLoggedIn: true })}
								loggedIn={this.state.userLoggedIn}/> }
						/>

						<Route
							path="/register" 
							component={ props => <Register
								{...props}	
								loggedIn={this.state.userLoggedIn}/> } 
						/>

						<Route 
							path="/create" 
							component={ props => <Create
								{...props}
								loggedIn={this.state.userLoggedIn}/> } 
						/>

						<Route 
							path="/link/:id" 
							component={ props => <Group
								{...props}
								loggedIn={this.state.userLoggedIn}/> } 
						/>
					
					</div>
				</div>
			</Router>
		)
	};

}