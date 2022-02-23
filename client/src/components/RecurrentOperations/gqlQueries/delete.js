import { gql } from '@apollo/client';

export default gql`
  mutation DeleteRecurrentOperation($id: ID) {
    deleteRecurrentOperation(id: $id) {
      id
    }
  }
`;
