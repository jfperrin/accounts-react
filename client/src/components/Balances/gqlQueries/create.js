import { gql } from '@apollo/client';

export default gql`
  mutation AddBalance($label: String) {
    addBalance(label: $label) {
      label
    }
  }
`;
