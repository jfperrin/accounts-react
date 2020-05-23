import gql from 'graphql-tag';

export default gql`
  {
    balances {
      id
      amount
      bank {
        label
      }
    }
  }
`;
