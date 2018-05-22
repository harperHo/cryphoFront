import React, { Component } from 'react';

import { Dashboard, Sidebar } from '../../containers';

export default class Home extends Component {

	constructor(props) {
		super(props);

    this.state = {
      activeCurrencies: [],
    };

		this.handleClick = this.handleClick.bind(this);
	}

  handleClick(activeCurrencies) {
    this.setState({
      activeCurrencies,
    });
  }

	render() {
		const { activeCurrencies } = this.state;

		return (
			<div className="home">
        <Sidebar handleClick={this.handleClick} />
        <Dashboard currencies={activeCurrencies} />
			</div>
		);
	}
}
