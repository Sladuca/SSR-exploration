/**
 *  Copyright (c) 2018, Cloudflare, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react'
import { useStyles } from '../lib/styles'
import { Typography, Grid, TextField, Card, CardContent, CardActions, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'

function Index (props) {
  const classes = useStyles()

  return (
      <Grid container className={classes.root} alignItems='center' justify=''>
        {/* TITLE */}
        <Grid item xs={12} className={classes.row}>
          <Typography color='textPrimary' variant='h1' display='block' align='center' className={classes.title}>The future of Quizbowl tournaments</Typography>
        </Grid>
        {/* SEARCH */}
        <Grid container xs={12} justify='center' className={classes.row}>
          <Grid container xs={8} spacing={1} className={classes.margin} alignItems="flex-end">
            <Grid item>
              <SearchIcon fontSize='large'/>
            </Grid>
            <Grid item style={{flexGrow: 1}}>
              <TextField
                id="index-search"
                label="Search for literally anything"
                style={{ margin: 8 }}
                margin="normal"
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        {/* LINKS */}
        <Grid container xs={12} justify="space-around" className={classes.row}>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography className={classes.cardTitle}>
                  Stats
                </Typography>
                <Typography>
                  Find tournament results with detailed stats
                </Typography>
              </CardContent>
              <CardActions>
                <Grid justify='center'>
                  <Button size='small'>Stats <ArrowRightAltIcon /></Button>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography className={classes.cardTitle}>
                  Tournaments
                </Typography>
                <Typography>
                  Register, plan, and make announcements for tournaments.
                </Typography>
              </CardContent>
              <CardActions>
                <Grid justify='center'>
                  <Button size='small'>Tournaments <ArrowRightAltIcon /></Button>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography className={classes.cardTitle}>
                  About
                </Typography>
                <Typography>
                  Read more about QBHQ and the initiative behind it.
                </Typography>
              </CardContent>
              <CardActions>
                <Grid justify='center'>
                  <Button size='small'>About <ArrowRightAltIcon /></Button>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
  )
}

export default Index
