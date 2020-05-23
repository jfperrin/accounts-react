import { gql } from 'apollo-boost';

export default gql`
  mutation DeleteRecurrentOperation($id: ID) {
    deleteRecurrentOperation(id: $id) {
      id
    }
  }
`;
