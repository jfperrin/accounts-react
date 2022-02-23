import { gql } from '@apollo/client';
import userFragment from './user';

export default gql`
  {
    user {
      ...userFragment
    }
  }
  ${userFragment}
`;
