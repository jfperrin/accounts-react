import { gql } from 'apollo-boost';
import periodFragment from './period';

export default gql`
  query getPeriod($id: ID!) {
    period(id: $id) {
      ...periodFragment
    }
  }
  ${periodFragment}
`;
