import { gql } from 'apollo-boost';
import bankFragment from '../bank';

export default gql`
  subscription {
    createBank {
      ...bankFragment
    }
  }
  ${bankFragment}
`;
