import { gql } from 'apollo-boost';

export default gql`
  mutation DeleteBalance($id: ID) {
    deleteBalance(id: $id) {
      id
    }
  }
`;
