import { gql } from '@apollo/client';
import recurrentoperationFragment from './recurrentoperation';

export default gql`
  mutation addRecurrentOperation($day: Int, $label: String, $amount: Float) {
    addRecurrentOperation(day: $day, amount: $amount, label: $label) {
      ...recurrentoperationFragment
    }
  }
  ${recurrentoperationFragment}
`;
