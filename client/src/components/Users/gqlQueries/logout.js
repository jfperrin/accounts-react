import { gql } from '@apollo/client';
import userFragment from './user';

export default gql`
  mutation {
    logout {
      ...userFragment
    }
  }
  ${userFragment}
`;
