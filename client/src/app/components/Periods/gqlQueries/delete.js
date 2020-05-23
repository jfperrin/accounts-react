import gql from 'graphql-tag';

export default gql`
  mutation DeletePeriod($id: ID) {
    deletePeriod(id: $id) {
      id
    }
  }
`;
