import { gql } from 'apollo-boost';

export default gql`
  {
    recurrentOperations {
      id
      amount
      day
      label
    }
  }
`;
