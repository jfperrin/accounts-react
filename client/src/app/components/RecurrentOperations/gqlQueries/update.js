import gql from 'graphql-tag';

export default gql`
  mutation updateRecurrentOperation($id: ID,$day: Int, $label: String, $amount: Float) {
    updateRecurrentOperation(id: $id, day: $day, amount: $amount, label: $label) {
      id
      amount
      day
      label
    }
  }
`;
