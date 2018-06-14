import React, { Component } from 'react';
import { Query } from "react-apollo";

import { GET_CURRENCIES_LIST } from '../../graphql/gql/query';
import { Search } from '../../components';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
    };

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(e) {
    const { activeCurrencies, handleClick } = this.props;
    const _activeCurrencies = activeCurrencies.slice();
    const currency = e.currentTarget.getAttribute('data-currency');
    const index = _activeCurrencies.indexOf(currency);

    if (index !== -1) {
      _activeCurrencies.splice(index, 1);
    } else {
      _activeCurrencies.push(currency);
    }

    return handleClick(_activeCurrencies);
  }

  setKeyword(keyword) {
    this.setState({
      keyword,
    })
  }

  renderCurrenciesList(currencies) {
    const { activeCurrencies } = this.props;

    return currencies.map(currency => {
      const isActive = activeCurrencies.includes(currency);

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
