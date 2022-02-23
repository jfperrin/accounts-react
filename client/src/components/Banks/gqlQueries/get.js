import { gql } from '@apollo/client';
import fragment from './bank';

export default gql`
  query getBank($id: ID!) {
    bank(id: $id) {
      ...bankFragment
    }
  }
  ${fragment}
`;

export const UPDATE_BANK_SUBSCRIPTION = gql`
  subscription ($id: ID!) {
    updateBank(id: $id) {
      ...bankFragment
    }
  }
  ${fragment}
`;
