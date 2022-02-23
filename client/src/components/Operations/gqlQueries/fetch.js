import { gql } from '@apollo/client';

export default gql`
  {
    operations {
      id
      label
      amount
      dt
      period {
        id
        year
        month
      }
    }
  }
`;
