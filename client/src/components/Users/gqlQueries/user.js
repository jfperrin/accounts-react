import { gql } from '@apollo/client';

export default gql`
  fragment userFragment on UsersType {
    id
    email
    firstname
    lastname
    nickname
  }
`;
