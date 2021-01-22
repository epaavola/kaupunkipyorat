import React from 'react'
import HomeHeader from '../components/HomeHeader'
import HomeContent from '../components/HomeContent'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Menu from '../components/Menu'
import { useQuery, gql } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
    },
    sideBar: {
        padding: "1em",
        backgroundColor: "#516FFA"
    },
    contentArea: {
        height: "100vh"
    }

}))
const bikeStops = gql`
    {
        bikeRentalStations {
            stationId
            name
            bikesAvailable
            spacesAvailable
            lat
            lon
            allowDropoff
        }
    }`

const Frontpage = () => {

    const classes = useStyles()
    const { loading, error, data } = useQuery(bikeStops)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :</p>

    return (
        <div className={classes.root}>
            <Grid container justify="center">
                <Grid className={classes.sideBar} item xs={12} md={5} lg={3} xl={3}>
                    <HomeHeader />
                    <Menu bikeData={data.bikeRentalStations}/>
                </Grid>
                <Grid className={classes.contentArea} item xs={12} md={7} lg={9} xl={9}>
                    <HomeContent bikeData={data}/>
                </Grid>               
            </Grid>
        </div>
    )
}

export default Frontpage