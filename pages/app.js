import React from 'react'
import {Helmet} from 'react-helmet'
import { makeStyles } from '@material-ui/core/styles';

import Nav from '../components/nav'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100%',
    backgroundColor: '#ffffff',
    backgroundImage: 'linear-gradient(148deg, #ffffff 22%, #dedede 100%)'
  }
}))

const App = props => {
  const classes = useStyles()
  return (
    <div id='app' className={classes.root}>
        <Helmet>
            <meta charSet='utf-8' />
            <title>{props.title}</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Helmet>
        <Nav title={props.title}/>
        {props.children}
    </div>
  )
}

export default App
