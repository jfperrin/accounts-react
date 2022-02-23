import { gql } from '@apollo/client';

export default gql`
  fragment periodFragment on PeriodsType {
    id
    display
    year
    month
    operations {
      id
      dt
      amount
      label
      pointedAt
      isRecurrent
    }
    balances {
      id
      amount
      bank {
        label
      }
    }
    balance {
      banks
      operations
    }
  }
`;
