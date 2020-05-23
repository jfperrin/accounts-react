import { gql } from 'apollo-boost';
import periodFragment from './period';

export default gql`
  {
    periods {
      ...periodFragment
    }
  }
  ${periodFragment}
`;
