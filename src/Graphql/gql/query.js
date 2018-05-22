import gql from 'graphql-tag';

export const GET_CURRENCIES_LIST = gql`
  {
    currencies
  }
`;

export const GET_TICKERS_SNAPSHOT = gql`
  {
    tickers {
      currency
      exchanges {
        exchange
        price
        vol
        pct
      }
    }
  }
`;
