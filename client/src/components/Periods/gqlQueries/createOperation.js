import { gql } from '@apollo/client';
import periodFragment from './period';

export default gql`
  mutation addOperation($periodId: ID, $label: String, $amount: Float, $dt: String) {
    addOperation(periodId: $periodId, label: $label, amount: $amount, dt: $dt) {
      ...periodFragment
    }
  }
  ${periodFragment}
`;
