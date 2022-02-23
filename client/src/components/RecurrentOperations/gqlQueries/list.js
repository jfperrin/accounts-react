import { gql } from '@apollo/client';
import recurrentoperationFragment from './recurrentoperation';

export default gql`
  {
    recurrentOperations {
      ...recurrentoperationFragment
    }
  }
  ${recurrentoperationFragment}
`;
