import { gql } from 'apollo-boost';
import userFragment from './user';

export default gql`
  mutation {
    logout {
      ...userFragment
    }
  }
  ${userFragment}
`;
