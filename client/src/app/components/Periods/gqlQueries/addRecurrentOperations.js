import gql from 'graphql-tag';
import periodFragment from './period';

export default gql`
  mutation importRecurrentOperations($id: ID) {
    importRecurrentOperations(id: $id) {
      ...periodFragment
    }
  }
  ${periodFragment}
`;
