import gql from 'graphql-tag';
import recurrentoperationFragment from './recurrentoperation';

export default gql`
  {
    recurrentOperations {
      ...recurrentoperationFragment
    }
  }
  ${recurrentoperationFragment}
`;
