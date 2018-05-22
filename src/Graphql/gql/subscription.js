import gql from 'graphql-tag';

export const SUBSCRIBE_TICKER = gql`
  subscription onUpdateTicker {
    updateTicker {
      currency
      ticker {
        exchange
        price
        vol
        pct
      }
    }
  }
`;


// export const SUBSCRIBE_TICKER = gql`
//   subscription onNewPrice($currencies: [String]!) {
//     newPrice(currencies: $currencies) {
//       currency
//       exchanges {
//         exchange
//         price
//       }
//     }
//   }
// `;
