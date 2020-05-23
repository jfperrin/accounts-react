import { gql } from 'apollo-boost';
import fragment from '../bank';

export default gql`
  subscription($id: ID!) {
    deleteBank(id: $id) {
      ...bankFragment
    }
  }
  ${fragment}
`;
