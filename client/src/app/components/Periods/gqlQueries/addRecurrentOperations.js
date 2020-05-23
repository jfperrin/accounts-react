import { gql } from 'apollo-boost';
import periodFragment from './period';

export default gql`
  mutation importRecurrentOperations($id: ID) {
    importRecurrentOperations(id: $id) {
      ...periodFragment
    }
  }
  ${periodFragment}
`;
