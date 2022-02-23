import { gql } from '@apollo/client';

export default gql`
  mutation AddPeriod($year: Int, $month: Int) {
    addPeriod(year: $year, month: $month) {
      id
      year
      month
    }
  }
`;
