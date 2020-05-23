import { gql } from 'apollo-boost';

export default gql`
  mutation addRecurrentOperation($day: Int, $label: String, $amount: Float) {
    addRecurrentOperation(day: $day, amount: $amount, label: $label) {
      amount
      day
      label
    }
  }
`;
