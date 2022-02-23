import { gql } from '@apollo/client';

export default gql`
  mutation DeletePeriod($id: ID) {
    deletePeriod(id: $id) {
      id
    }
  }
`;
