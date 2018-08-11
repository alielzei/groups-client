import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Home from 		 './Components/Home';
import Login from 	 './Components/Login';
import Register from './Components/Register';
import Create from 	 './Components/Create';
import Group from 	 './Components/Group';

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
							<h1 className="proj-title">untitled</h1>
						</Link>
						{this.state.userLoggedIn
							?
							<div className="header-buttons">
								<button><Link to="/create">create</Link></button>
								<button><a onClick={this.logoutUser}>logout</a></button>
							</div> 
							:
							<div className="header-buttons">
		      			<button><Link to="/login">login</Link></button>
								<button><Link to="/register">signup</Link></button>
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