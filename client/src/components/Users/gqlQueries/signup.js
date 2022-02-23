import { gql } from '@apollo/client';
import userFragment from './user';

export default gql`
  mutation Signup($email: String, $password: String, $firstname: String, $lastname: String, $nickname: String) {
    signup(email: $email, password: $password, firstname: $firstname, lastname: $lastname, nickname: $nickname) {
      ...userFragment
    }
  }
  ${userFragment}
`;
