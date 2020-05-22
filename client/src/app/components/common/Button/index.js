import { withStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import FloatingActionButton from '@material-ui/core/Fab';

const color = deepPurple;

const Index = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(color[500]),
    backgroundColor: color[500],
    '&:hover': {
      backgroundColor: color[700],
    },
  },
}))(FloatingActionButton);

export default Index;
