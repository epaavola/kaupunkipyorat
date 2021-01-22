import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { useQuery, gql } from '@apollo/client';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    table: {
        width: "100%",
    },
    header: {
        fontSize: "1em",
        fontWeight: 600
    },

}))

const bikeStops = gql`
    {
        bikeRentalStations {
            stationId
            name
            bikesAvailable
            spacesAvailable
            allowDropoff
        }
    }`

function BikeStations() {
    const classes = useStyles();
    const { loading, error, data } = useQuery(bikeStops)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :</p>

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow >
                        <TableCell className={classes.header}>Pysäkki</TableCell>
                        <TableCell className={classes.header} align="right">Vapaat pyörät</TableCell>
                        <TableCell className={classes.header} align="right">Tyhjät paikat</TableCell>
                        <TableCell className={classes.header} align="right">Pysäkin tunnus</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.bikeRentalStations.map((data) => (
                        <TableRow key={data.stationId}>
                            <TableCell component="th" scope="row">
                                {data.name}
                            </TableCell>
                            <TableCell align="right">{data.bikesAvailable}</TableCell>
                            <TableCell align="right">{data.spacesAvailable}</TableCell>
                            <TableCell align="right">{data.stationId}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


export default BikeStations