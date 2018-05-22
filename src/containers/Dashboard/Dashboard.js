import React, { Component } from 'react';
import { Query, Subscription } from "react-apollo";
import gql from 'graphql-tag';

import { GET_TICKERS_SNAPSHOT } from '../../graphql/gql/query';
import { SUBSCRIBE_TICKER } from '../../graphql/gql/subscription';
import { Block } from '../../components'

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  renderCurrencies(data) {
    const { currencies } = this.props;

    if (data && data.length > 0) {

      return currencies.map(currency => {
        const currencyData = data.find(element => element.currency === currency);
        const exchanges = currencyData.exchanges;

        return (
          <Block
            key={currency}
            currency={currency}
            exchanges={exchanges}
          />
        );
      });
    }

    return null;
  }

  render() {
    const { currencies } = this.props;

    return (
      <div className="dashboard">
        <Query
          query={GET_TICKERS_SNAPSHOT}
        >
          {
            ({ subscribeToMore, loading, data }) => {

              subscribeToMore({
                document: SUBSCRIBE_TICKER,
                updateQuery: (prev, { subscriptionData }) => {
                  const subscribeData = subscriptionData.data;

                  if (!subscribeData) return prev;

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
              });

              return this.renderCurrencies(data.tickers);
            }
          }
        </Query>
      </div>
    );

    // return (
    //   <div className="dashboard">
    //     <Query
    //       query={GET_TICKERS_SNAPSHOT}
    //     >
    //       {
    //           ({loading, error, data}) => {
    //             console.log(data);
    //             if (loading) return <p>Loading...</p>
    //             // return JSON.stringify(data);
    //             return this.renderCurrencies(data.tickers);
    //           }
    //         }
    //     </Query>
    //   </div>
    // );
  }
}
