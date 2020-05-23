import { gql } from 'apollo-boost';

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
