import { gql } from '@apollo/client';

export default gql`
  fragment recurrentoperationFragment on RecurrentOperationsType {
    id
    amount
    day
    label
  }
`;
