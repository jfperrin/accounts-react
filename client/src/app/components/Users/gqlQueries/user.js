import gql from 'graphql-tag';

export default gql`
  fragment userFragment on UsersType {
    id
    email
    firstname
    lastname
    nickname
  }
`;
