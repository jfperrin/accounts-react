import { gql } from 'apollo-boost';
import periodFragment from './period';

export default gql`
  mutation initializeBankBalances($id: ID) {
    initializeBankBalances(id: $id) {
      ...periodFragment
    }
  }
  ${periodFragment}
`;
