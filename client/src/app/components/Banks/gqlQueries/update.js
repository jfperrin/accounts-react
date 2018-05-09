import gql from 'graphql-tag';

export default gql`
  mutation updateBank($id: ID, $label: String) {
    updateBank(id: $id, label: $label) {
      id
      label
    }
  }`;
