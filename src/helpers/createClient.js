import { SubscriptionClient } from 'subscriptions-transport-ws';
import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";

const HTTP_ENDPOINT = 'http://localhost:3000/graphql';
const WEBSOCKET_ENDPOINT = 'ws://localhost:3000/';

class apolloClientCreater {

  constructor() {
    const httpLink = new HttpLink({
      uri: HTTP_ENDPOINT,
    });

    const wsLink = new SubscriptionClient(WEBSOCKET_ENDPOINT, {
      reconnect: true
    });

    const link = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink,
    );

    const client = new ApolloClient({
      link,
      cache: new InMemoryCache()
    });

    this.wsLink = wsLink;
    this.client = client;
  }

  onConnecting(cb) {
    const { wsLink: socket } = this;

    socket.on('connecting', cb);
  }

  onConnected(cb) {
    const { wsLink: socket } = this;

    socket.on('connected', cb);
  }

  onDisconnected(cb) {
    const { wsLink: socket } = this;

    socket.on('disconnected', cb);
  }

  onReconnecting(cb) {
    const { wsLink: socket } = this;

    socket.on('reconnecting', cb);
  }

  onReconnected(cb) {
    const { wsLink: socket } = this;

    socket.on('reconnected', cb);
  }

  close() {
    const { wsLink: socket } = this;

    socket.close();
  }
}

export default apolloClientCreater;
