import React, { Component } from 'react';
import { Query } from "react-apollo";

import { GET_CURRENCIES_LIST } from '../../graphql/gql/query';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeItems: []
    };

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(e) {
    const { handleClick } = this.props;
    const { activeItems } = this.state;
    const _activeItems = activeItems.slice();
    const currency = e.currentTarget.getAttribute('data-currency');
    const index = _activeItems.indexOf(currency);

    if (index !== -1) {
      _activeItems.splice(index, 1);
    } else {
      _activeItems.push(currency);
    }

    this.setState({
      activeItems: _activeItems
    });

    return handleClick(_activeItems);
  }

  renderCurrenciesList(currencies) {
    const { activeItems } = this.state;

    return currencies.map(currency => {
      const isActive = activeItems.includes(currency);

      return (
        <li key={currency} className={`item ${isActive ? 'active' : ''}`} onClick={this._handleClick} data-currency={currency}>
          {currency}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="sidebar">
        <ul className="currency-list">
          <Query query={GET_CURRENCIES_LIST}>
            {
              ({loading, error, data}) => {
                if (loading) return <p>Loading...</p>
                return this.renderCurrenciesList(data.currencies);
              }
            }
          </Query>
        </ul>
      </div>
    );
  }
}
