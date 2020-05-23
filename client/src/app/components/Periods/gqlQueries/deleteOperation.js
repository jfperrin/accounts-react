import { gql } from 'apollo-boost';
import periodFragment from './period';

export default gql`
  mutation deleteOperation($id: ID, $idOperation: ID) {
    deleteOperation(id: $id, idOperation: $idOperation) {
      ...periodFragment
    }
  }
  ${periodFragment}
`;
