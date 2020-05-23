import { gql } from 'apollo-boost';

export default gql`
  mutation updateBalance($id: ID, $amount: String) {
    updateBalance(id: $id, amount: $amount) {
      id
      amount
      bank {
        label
      }
    }
  }
`;
