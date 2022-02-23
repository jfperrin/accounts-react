import { gql } from '@apollo/client';

export default gql`
  mutation updateBank($id: ID, $label: String) {
    updateBank(id: $id, label: $label) {
      id
      label
    }
  }
`;
