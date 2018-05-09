import gql from 'graphql-tag';
import periodFragment from './period';

export default gql`
  query getPeriod($id: ID!) {
    period(id: $id) {
      ...periodFragment,
    }
  }
  ${periodFragment}
`;
