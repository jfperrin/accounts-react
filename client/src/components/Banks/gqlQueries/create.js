import { gql } from '@apollo/client';

export default gql`
  mutation AddBank($label: String) {
    addBank(label: $label) {
      id
      label
    }
  }
`;
