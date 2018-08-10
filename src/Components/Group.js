import React from 'react';

export default class Group extends React.Component {

	id = this.props.match.params.id;
	constructor(props){
		super(props);
	};

	render(){
		return(
			<p>{this.id}</p>
		);
	}
}