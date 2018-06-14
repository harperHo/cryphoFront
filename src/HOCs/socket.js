import React, { Component } from 'react';

import apolloClientCreator from '../helpers/createClient';

export default function socket(WrappedComponent) {
  return class extends Component {

    constructor(props) {
      super(props);

      this.state = {
        apolloClient: null,
        status: 0, // 0: connecting, 1: connected, 2: disconnected
      };
    }

    componentDidMount() {
      const apolloClient = new apolloClientCreator();

      apolloClient.onConnecting(() => {
        console.log('Socket connecting...');
        this.setState({
          status: 0,
        });
      });

      apolloClient.onConnected(() => {
        console.log('Socket connected!');
        this.setState({
          status: 1,
        });
      });

      apolloClient.onDisconnected(() => {
        console.log('Socket disconnected!');
        this.setState({
          status: 2,
        });
      });

      apolloClient.onReconnecting(() => {
        console.log('Socket reconnecting...');
        this.setState({
          status: 0,
        });
      });

      apolloClient.onReconnected(() => {
        console.log('Socket reconnected!');
        this.setState({
          status: 1,
        });
      });

      this.setState({
        apolloClient,
      })
    }

    render() {
      const { apolloClient, status } = this.state;

      return <WrappedComponent apolloClient={apolloClient} status={status} {...this.props} />;
    }
  }
}
