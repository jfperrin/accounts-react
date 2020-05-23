import gql from 'graphql-tag';
import userFragment from './user';

export default gql`
  {
    user {
      ...userFragment
    }
  }
  ${userFragment}
`;
