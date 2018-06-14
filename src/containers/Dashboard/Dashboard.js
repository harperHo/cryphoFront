import React, { Component } from 'react';

import { Block } from '../../components';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.subscribeToNewTicker();
  }

  renderCurrencies() {
    const { currencies, data } = this.props;

    if (data) {
      const tickers = data.tickers || [];

      if (tickers && tickers.length > 0) {

        return currencies.map(currency => {
          const tickerData = tickers.find(ticker => ticker.currency === currency);
          const exchanges = tickerData.exchanges;

          return (
            <Block
              key={currency}
              currency={currency}
              exchanges={exchanges}
            />
          );
        });
      }
    }


    return null;
  }

  render() {
    const { loading } = this.props;

    return (
      <div className="dashboard">
        {this.renderCurrencies()}
      </div>
    );
  }
}
