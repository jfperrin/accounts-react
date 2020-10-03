import gql from 'graphql-tag';
import recurrentoperationFragment from './recurrentoperation';

export default gql`
  mutation updateRecurrentOperation($id: ID, $day: Int, $label: String, $amount: Float) {
    updateRecurrentOperation(id: $id, day: $day, amount: $amount, label: $label) {
      ...recurrentoperationFragment
    }
  }
  ${recurrentoperationFragment}
`;
