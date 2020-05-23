import gql from 'graphql-tag';
import periodFragment from './period';

export default gql`
  mutation initializeBankBalances($id: ID) {
    initializeBankBalances(id: $id) {
      ...periodFragment
    }
  }
  ${periodFragment}
`;
