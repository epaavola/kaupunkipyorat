import React from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Map from './Map'


const useStyles = makeStyles(() => ({
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