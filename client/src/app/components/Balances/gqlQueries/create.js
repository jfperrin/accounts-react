import { gql } from 'apollo-boost';

export default gql`
  mutation AddBalance($label: String) {
    addBalance(label: $label) {
      label
    }
  }
`;
