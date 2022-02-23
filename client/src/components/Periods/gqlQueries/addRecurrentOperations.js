import { gql } from '@apollo/client';
import periodFragment from './period';

export default gql`
  mutation importRecurrentOperations($id: ID) {
    importRecurrentOperations(id: $id) {
      ...periodFragment
    }
  }
  ${periodFragment}
`;
