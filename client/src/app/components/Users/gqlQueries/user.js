import { gql } from 'apollo-boost';

export default gql`
  fragment userFragment on UsersType {
    id
    email
    firstname
    lastname
    nickname
  }
`;
