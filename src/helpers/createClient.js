import { SubscriptionClient } from 'subscriptions-transport-ws';
import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";


const client = () => {
  const HTTP_ENDPOINT = 'http://localhost:3000/graphql';
  const WEBSOCKET_ENDPOINT = 'ws://localhost:3000/';

  const httpLink = new HttpLink({
    uri: HTTP_ENDPOINT,
  })

  const wsLink = new WebSocketLink({
    uri: WEBSOCKET_ENDPOINT,
    options: {
      reconnect: true
    }
  });

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
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
  })

  // const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  //   reconnect: true,
  // });

  // const apolloClient = new ApolloClient({
  //     networkInterface: client,
  // });

  return client;
}

export default client;

// console.log(socketClient());

// class GraphQLSubscriptionAdapter {
//   constructor() {
//     this.socketClient =
//   }
// }

// export default () => new GraphQLSubscriptionAdapter();


// const client = socketClient();

// // console.log(client);

// client.subscribe({
//   query: gql`
//     subscription onNewItem {
//         newPrice(currencies: ["ETH"]) {
//           currency
//           exchanges {
//             exchange
//             price
//           }
//         }
//     }`
//   })
//   .then(result => console.log(result));

// client.subscribe({
//   query: gql`
//     subscription onNewItem {
//         newPrice(currencies: ["ETH"]) {
//           currency
//           exchanges {
//             exchange
//             price
//           }
//         }
//     }`,
//   variables: {}
// }).subscribe({
//   next(data) {
//     console.log(data);
//   }
// })
