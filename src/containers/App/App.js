import React, { Component, Fragment, Children, cloneElement } from 'react';
import { Query, Subscription } from "react-apollo";

import { GET_TICKERS_SNAPSHOT } from '../../graphql/gql/query';
import { SUBSCRIBE_TICKER } from '../../graphql/gql/subscription';
import { Header } from '../../components';

export default class App extends Component {
	render() {
		return (
			<Fragment>
        <Header />
				{this.props.children}
			</Fragment>
		);
	}

  // render() {
  //   return (
  //     <Fragment>
  //       <Query
  //         query={GET_TICKERS_SNAPSHOT}
  //       >
  //         {
  //           ({ subscribeToMore, loading, data }) => {

  //             subscribeToMore({
  //               document: SUBSCRIBE_TICKER,
  //               updateQuery: (prev, { subscriptionData }) => {
  //                 const subscribeData = subscriptionData.data;

  //                 if (!subscribeData) return prev;

  //                 const { updateTicker: { currency, ticker } } = subscribeData;
  //                 const _prev = JSON.parse(JSON.stringify(prev));
  //                 const currencyData = _prev.tickers.find(element => element.currency === currency);
  //                 const index = currencyData.exchanges.findIndex(element => element.exchange === ticker.exchange);

  //                 if (index === -1) {
  //                   currencyData.exchanges.push(ticker);
  //                 } else {
  //                   currencyData.exchanges[index] = ticker;
  //                 }

  //                 return _prev;
  //               }
  //             });
  //             // return this.props.children;
  //            return cloneElement(this.props.children, { tickers: data.tickers });
  //           }
  //         }
  //       </Query>
  //     </Fragment>
  //   );
  // }

  // render() {
  //   // const { children } = this.props;

  //   return (
  //     <Query
  //       query={GET_TICKERS_SNAPSHOT}
  //     >
  //       {
  //         ({loading, error, data}) => {
  //           if (loading) return <p>Loading...</p>
  //           return (
  //              <Fragment>
  //                {this.props.children}
  //              </Fragment>
  //            );
  //           // return this.renderCurrenciesList(data.currencies);
  //         }
  //         // ({ subscribeToMore, loading, data }) => {
  //         //   subscribeToMore({
  //         //     document: SUBSCRIBE_TICKER,
  //         //     updateQuery: (prev, { subscriptionData }) => {
  //         //       const subscribeData = subscriptionData.data;

  //         //       if (!subscribeData) return prev;

  //         //       const { updateTicker: { currency, ticker } } = subscribeData;
  //         //       const _prev = JSON.parse(JSON.stringify(prev));
  //         //       const currencyData = _prev.tickers.find(element => element.currency === currency);
  //         //       const index = currencyData.exchanges.findIndex(element => element.exchange === ticker.exchange);

  //         //       if (index === -1) {
  //         //         currencyData.exchanges.push(ticker);
  //         //       } else {
  //         //         currencyData.exchanges[index] = ticker;
  //         //       }

  //         //       return _prev;
  //         //     }
  //         //   });

  //         //   return Children.map(child => cloneElement(child, { tickers: data.tickers }));
  //         }
  //       }
  //     </Query>
  //   );
  // }
}
