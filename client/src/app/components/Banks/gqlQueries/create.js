import gql from 'graphql-tag';

export default gql`
  mutation AddBank($label: String) {
    addBank(label: $label) {
      label
    }
  }
`;
