import { gql } from 'apollo-boost';

export default gql`
  mutation AddBank($label: String) {
    addBank(label: $label) {
      label
    }
  }
`;
