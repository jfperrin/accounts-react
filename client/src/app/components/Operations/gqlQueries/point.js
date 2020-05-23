import gql from 'graphql-tag';

export default gql`
  mutation pointOperation($id: ID) {
    pointOperation(id: $id) {
      id
      label
      dt
      amount
      pointedAt
    }
  }
`;
