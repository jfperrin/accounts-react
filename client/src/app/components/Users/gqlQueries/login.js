import gql from 'graphql-tag';
import userFragment from './user';

export default gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      ...userFragment
    }
  }
  ${userFragment}
`;
