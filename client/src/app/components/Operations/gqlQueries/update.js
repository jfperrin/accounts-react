import gql from 'graphql-tag';

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
