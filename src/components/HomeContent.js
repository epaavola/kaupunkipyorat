import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Map from './Map'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "100%",
        overflow: "hidden"
    },

}))


const HomeContent = ( {bikeData} ) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>

            <Map markersData={bikeData.bikeRentalStations}/>

        </div>
    )
}

export default withRouter(HomeContent)