import { gql } from 'apollo-boost';

export default gql`
  mutation updateBank($id: ID, $label: String) {
    updateBank(id: $id, label: $label) {
      id
      label
    }
  }
`;
