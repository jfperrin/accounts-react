import { gql } from '@apollo/client';

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
