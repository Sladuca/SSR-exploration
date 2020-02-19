import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100%',
    backgroundColor: '#ffffff',
    backgroundImage: 'linear-gradient(148deg, #ffffff 22%, #dedede 100%)'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navTitle: {
    flexGrow: 1,
  },
    title: {
    padding: theme.spacing(3)
  },
  cardTitle: {
    fontSize: 'large'
  },
  margin: {
    margin: theme.spacing(1),
  },
  row: {
    margin: theme.spacing(3)
  }
}))
