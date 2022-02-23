import { gql } from '@apollo/client';
import periodFragment from './period';

export default gql`
  mutation initializeBankBalances($id: ID) {
    initializeBankBalances(id: $id) {
      ...periodFragment
    }
  }
  ${periodFragment}
`;
