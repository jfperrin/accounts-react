import gql from 'graphql-tag';

export default gql`
  mutation AddPeriod($year: Int, $month: Int) {
    addPeriod(year: $year, month: $month) {
      id
      year
      month
    }
  }
`;
