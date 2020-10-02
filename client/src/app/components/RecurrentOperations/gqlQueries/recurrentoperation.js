import gql from 'graphql-tag';

export default gql`
  fragment recurrentoperationFragment on RecurrentOperationsType {
    id
    amount
    day
    label
  }
`;
