import { gql } from '@apollo/client';

export default gql`
  mutation updateOperation($id: ID, $amount: Float, $dt: Date, $label: String) {
    updateOperation(id: $id, label: $label, amount: $amount, dt: $dt) {
      id
      dt
      amount
      label
      pointedAt
      isRecurrent
    }
  }
`;
