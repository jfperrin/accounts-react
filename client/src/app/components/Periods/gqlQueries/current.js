import gql from 'graphql-tag';
import periodFragment from './period';

export default gql`
  {
    currentPeriod {
      ...periodFragment
    }
  }
  ${periodFragment}
`;
