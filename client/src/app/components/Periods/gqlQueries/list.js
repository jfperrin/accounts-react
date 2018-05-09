import gql from 'graphql-tag';
import periodFragment from './period';

export default gql`
  {
    periods {
      ...periodFragment
    }
  }
  ${periodFragment}
`;
