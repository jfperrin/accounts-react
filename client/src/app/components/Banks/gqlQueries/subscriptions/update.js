import gql from 'graphql-tag';
import fragment from '../bank';

export default gql`
  subscription($id: ID!) {
    updateBank(id: $id) {
      ...bankFragment
    }
  }
  ${fragment}
`;
