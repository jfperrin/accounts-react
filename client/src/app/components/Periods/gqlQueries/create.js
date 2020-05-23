import { gql } from 'apollo-boost';

export default gql`
  mutation AddPeriod($year: Int, $month: Int) {
    addPeriod(year: $year, month: $month) {
      year
      month
    }
  }
`;
