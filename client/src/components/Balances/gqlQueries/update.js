import { gql } from '@apollo/client';

export default gql`
  mutation updateBalance($id: ID, $amount: Float) {
    updateBalance(id: $id, amount: $amount) {
      id
      amount
      bank {
        label
      }
    }
  }
`;
