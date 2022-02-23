import { gql } from '@apollo/client';

export default gql`
  mutation DeleteBalance($id: ID) {
    deleteBalance(id: $id) {
      id
    }
  }
`;
