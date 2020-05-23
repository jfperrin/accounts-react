import { gql } from 'apollo-boost';

export default gql`
  mutation DeletePeriod($id: ID) {
    deletePeriod(id: $id) {
      id
    }
  }
`;
