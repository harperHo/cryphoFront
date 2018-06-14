import React, { Component } from 'react';
import { createPortal } from 'react-dom';

export default class Loading extends Component {

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    const { text } = this.props;

    return createPortal(
      <div className="loading">
        <div className="loader-container">
          <div className="loader loader-1"></div>
          <div className="loader loader-2"></div>
        </div>
        {
          text &&
            <span className="text">{text}</span>
        }
      </div>,
      this.el
    );
  }
}
