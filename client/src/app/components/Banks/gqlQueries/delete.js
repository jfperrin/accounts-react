import gql from 'graphql-tag';
import fragment from './bank';

export default gql`
  mutation DeleteBank($id: ID){
    deleteBank(id: $id) {
      ...bankFragment
    }
  }
  ${fragment}
`;

export const DELETE_BANK_SUBSCRIPTION = gql`
  subscription($id: ID!) {
    deleteBank(id: $id) {
      ...bankFragment
    }
  }
  ${fragment}
`;
