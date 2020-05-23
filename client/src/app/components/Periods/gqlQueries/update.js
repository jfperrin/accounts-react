import gql from 'graphql-tag';

export default gql`
  mutation updatePeriod($id: ID, $year: Int, $month: Int) {
    updatePeriod(id: $id, year: $year, month: $month) {
      id
      year
      month
    }
  }
`;
