import { gql } from 'apollo-boost';

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
