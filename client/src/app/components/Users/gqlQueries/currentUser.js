import { gql } from 'apollo-boost';
import userFragment from './user';

export default gql`
  {
    user {
      ...userFragment
    }
  }
  ${userFragment}
`;
