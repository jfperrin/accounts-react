import { gql } from '@apollo/client';
import fragment from '../bank';

export default gql`
  subscription ($id: ID!) {
    updateBank(id: $id) {
      ...bankFragment
    }
  }
  ${fragment}
`;
