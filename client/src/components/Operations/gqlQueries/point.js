import { gql } from '@apollo/client';

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
