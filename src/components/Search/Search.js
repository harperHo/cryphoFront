import React, { Component } from 'react';

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      focus: false
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFocus() {
    this.setState({
      focus: true
    });
  }

  handleBlur() {
    this.setState({
      focus: false
    });
  }

  handleChange(e) {
    const { setKeyword } = this.props;
    const value = e.target.value;

    return setKeyword(value.toLowerCase());
  }

  render() {
    const { focus } = this.state;

    return (
      <div className={`search ${focus ? 'focus' : ''}`}>
        <span className={`icon ${focus ? 'icon-search-active' : 'icon-search'}`}></span>
        <input type="text" className="input" onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} />
      </div>
    );
  }
}
