import { gql } from '@apollo/client';
import bankFragment from '../bank';

export default gql`
  subscription {
    createBank {
      ...bankFragment
    }
  }
  ${bankFragment}
`;
