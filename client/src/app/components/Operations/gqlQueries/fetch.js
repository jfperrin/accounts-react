import gql from 'graphql-tag';

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
