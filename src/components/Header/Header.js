import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currency, exchanges } = this.props;

    return (
      <div className="header">
        <div className="header-column logo">BLABLA</div>
        <div className="header-column page-title">DASHBOARD</div>
        <div className="header-column icon-container">
          <i className="icon icon-eye"></i>
        </div>
      </div>
    );
  }
}
