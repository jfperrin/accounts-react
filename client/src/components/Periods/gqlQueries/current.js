import { gql } from '@apollo/client';
import periodFragment from './period';

export default gql`
  {
    currentPeriod {
      ...periodFragment
    }
  }
  ${periodFragment}
`;
