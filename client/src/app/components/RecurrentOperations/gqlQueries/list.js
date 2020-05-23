import gql from 'graphql-tag';

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
