import { gql } from 'apollo-boost';

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
