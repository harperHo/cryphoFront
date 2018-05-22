import React, { Component } from 'react';

export default class Block extends Component {
  constructor(props) {
    super(props);
  }

  renderExchanges() {
    const { exchanges} = this.props;

    const table = exchanges.map(exchange => {
      const { exchange: exchangeName, price, vol, pct } = exchange;
      return (
        <div className="row">
          <span className="column exchange">{exchangeName}</span>
          <span className="column price">{price.toFixed(8)}</span>
          <span className="column vol">{vol.toFixed(8)}</span>
          <span className="column pct">{Math.round(pct * 100) / 100} %</span>
        </div>
      );
    });

    return (
      <div className="table">
        <div className="row">
          <span className="column exchange">Exchange</span>
          <span className="column price">Price</span>
          <span className="column vol">Volume</span>
          <span className="column pct">Chg. 24H</span>
        </div>
        {table}
      </div>
    );
  }

  render() {
    const { currency, exchanges } = this.props;

    return (
      <div className="block">
        <span className="text">{currency}</span>
        {exchanges && this.renderExchanges()}
      </div>
    );
  }
}
