import { gql } from 'apollo-boost';

export default gql`
  mutation updatePeriod($id: ID, $year: Int, $month: Int) {
    updatePeriod(id: $id, year: $year, month: $month) {
      id
      year
      month
    }
  }
`;
