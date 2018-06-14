import React, { Component, Fragment, Children, cloneElement } from 'react';

import { ApolloProvider } from 'react-apollo';
import { socket } from '../../HOCs';
import { Header } from '../../components';
import { Loading } from '../../portals';

@socket
export default class App extends Component {

	render() {
    const { apolloClient, status } = this.props;

    if (apolloClient) {
      const { client } = apolloClient;

      return (
        <Fragment>
          {
            status === 0 &&
              <Loading text="Connecting to Websocket" />
          }
          <Header />
          {
            client &&
              <ApolloProvider client={client}>
                {this.props.children}
              </ApolloProvider>
          }
        </Fragment>
      );
    }

    return null;
	}
}
