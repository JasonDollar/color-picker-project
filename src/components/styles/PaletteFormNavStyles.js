import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../../constants'


const PaletteFormNavStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  navBtns: {
    marginRight: '.5rem',
    '& a': {
      textDecoration: 'none',
    },
    '@media(max-width:576px)': {
      marginRight: 0,
    },
  },
  button: {
    margin: '0 0.5rem',
    '@media(max-width:576px)': {
      margin: '0 2px',
    },
    '@media(max-width:407px)': {
      fontSize: '.8rem',
      margin: '0 2px',
      padding: '2px 4px',
    },
  },
}))

export default PaletteFormNavStyles 