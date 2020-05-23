import gql from 'graphql-tag';

export default gql`
  mutation DeleteRecurrentOperation($id: ID) {
    deleteRecurrentOperation(id: $id) {
      id
    }
  }
`;
