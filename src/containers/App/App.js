import React, { Component, Fragment, createContext, createRef } from 'react';

export default class App extends Component {
	render() {
		return (
			<Fragment>
				{this.props.children}
			</Fragment>
		);
	}
}
