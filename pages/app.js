import React from 'react'
import {Helmet} from 'react-helmet'
import Nav from '../components/nav'
import useStyles from '../lib/styles'

const App = props => {
  const classes = useStyles()
  return (
    <div id='app' className={classes.root}>
        <Helmet>
            <meta charSet='utf-8' />
            <title>{props.navTitle}</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Helmet>
        <Nav title={props.navTitle}/>
        {props.children}
    </div>
  )
}

export default App
