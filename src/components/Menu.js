import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Paper, Card, Select, MenuItem, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import WeatherService from './WeatherService'
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, } from 'recoil';
import { searchTextState, originState, destinationState } from './Atoms'
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    menu: {
        padding: "1em",
        marginBottom: "1em"
    },
    header: {
        textAlign: "Center",
        fontSize: "2.2em"
    },
    searchBar: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
        marginBottom: "1em"
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    searchResult: {
        padding: "0.5em",
        marginBottom: "0.5em",
        marginRight: "5px"
    },
    routes: {
        margin: "1rem"
    },
    resultContent: {
        height: "14vh",
        overflow: "auto",
        '&::-webkit-scrollbar': {
            width: '0.5em',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(81,111,250,1)',
            outline: '0px solid slategrey'
        }
    }
}))


const Menu = ({ bikeData }) => {
    const classes = useStyles()

    const [searchTerm, setSearchTerm] = useRecoilState(searchTextState);
    const [origin, setOrigin] = useRecoilState(originState);
    const [destination, setDestination] = useRecoilState(destinationState);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    }
    const handleOrignChange = (event, newValue) => {
        setOrigin(newValue);
    }
    const handleDestinationChange = (event, newValue) => {
        setDestination(newValue);
    }

    const results = !searchTerm ? []
        : bikeData.filter(data =>
            data.name.toLowerCase().startsWith(searchTerm.toLocaleLowerCase()))

    return (
        <>
            <Paper className={classes.menu} elevation={2}>
                <Typography className={classes.header} variant="h5" color="primary">
                    Haku
                </Typography>
                <Paper component="form" className={classes.searchBar}>
                    <InputBase
                        className={classes.input}
                        type="text"
                        placeholder="Esim. Rautatientori"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <IconButton className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <div className={classes.resultContent}>
                    {results.map(data => (
                        <Card className={classes.searchResult}>
                            <Typography>
                                <b>{data.name}</b> <br />
                             Vapaat pyörät: {data.bikesAvailable} <br />
                             Tyhjät paikat: {data.spacesAvailable}
                            </Typography>
                        </Card>
                    ))}
                </div>
            </Paper>
            <Paper className={classes.menu} elevation={2}>
                <Typography className={classes.header} variant="h5" color="primary">
                    Reitti
                </Typography>
                <div className={classes.routes}>
                    <Autocomplete
                        id="origin"
                        options={bikeData}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Lähtö" variant="outlined" />}
                        onChange={(event, newValue) => { handleOrignChange(event, newValue) }}
                    />
                </div>
                <div className={classes.routes}>
                    <Autocomplete
                        id="destination"
                        options={bikeData}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Määränpää" variant="outlined" />}
                        onChange={(event, newValue) => { handleDestinationChange(event, newValue) }}
                    />
                </div>
            </Paper>
            <Paper className={classes.menu} elevation={2}>
                <WeatherService />
            </Paper>
        </>
    )
}

export default withRouter(Menu)