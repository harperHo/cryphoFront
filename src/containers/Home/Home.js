import React, { Component } from 'react';
import { Query } from "react-apollo";

import { GET_TICKERS_SNAPSHOT } from '../../graphql/gql/query';
import { SUBSCRIBE_TICKER } from '../../graphql/gql/subscription';
import { Dashboard, Sidebar } from '../../containers';
// import { Loading } from '../../portals';

export default class Home extends Component {

	constructor(props) {
		super(props);

    this.state = {
      activeCurrencies: ['BTC', 'ETH'],
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
        <Sidebar activeCurrencies={activeCurrencies} handleClick={this.handleClick} />
        <Query
          query={GET_TICKERS_SNAPSHOT}
        >
          {
            ({ subscribeToMore, ...result}) => {

              return (
                <Dashboard
                  {...result}
                  currencies={activeCurrencies}
                  subscribeToNewTicker={() =>
                    subscribeToMore({
                      document: SUBSCRIBE_TICKER,
                      updateQuery: (prev, { subscriptionData }) => {
                        const subscribeData = subscriptionData.data;

                        const { updateTicker: { currency, ticker } } = subscribeData;
                        const _prev = JSON.parse(JSON.stringify(prev));
                        const currencyData = _prev.tickers.find(element => element.currency === currency);
                        const index = currencyData.exchanges.findIndex(element => element.exchange === ticker.exchange);

                        if (index === -1) {
                          currencyData.exchanges.push(ticker);
                        } else {
                          currencyData.exchanges[index] = ticker;
                        }

                        return _prev;
                      }
                    })
                  }
                />
              );
            }
          }
        </Query>
			</div>
		);
	}
}
