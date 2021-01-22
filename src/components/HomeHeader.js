import React from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingBottom: "1em",
        width: "100%"
    },
    h1: {
        textAlign: 'center',
        fontSize: "3em",
        paddingLeft: "0.2em",
        paddingBottom: "0.1em",
        paddingRight: "0.2em",
        fontFamily: "Permanent Marker",
        color: "#FFF",
    },
    h5: {
        textAlign: 'center',
        fontSize: "0.8em",
        paddingLeft: "1em",
        paddingRight: "1em",
        color: "#FFF"
    },

}))


const HomeHeader = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography className={classes.h1} variant="h1">
                PyöräParkki
            </Typography>
            <Typography className={classes.h5} variant="h5">
                Avoimet Rajapinnat ja avoin data kurssi <br /> Esa Paavola Syksy 2020
            </Typography>

        </div>
    )
}

export default withRouter(HomeHeader)