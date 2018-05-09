import gql from 'graphql-tag';

export default gql`
  mutation AddBalance($label: String){
    addBalance(label: $label) {
      label
    }
  }
`;
