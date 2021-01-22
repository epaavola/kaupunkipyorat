import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles((theme) => ({
    table: {
        width: "100%",
    },
    header: {
        textAlign: "left",
        fontSize: "2.2em",
        paddingRight: "1rem"
    },
    weatherResult: {
        paddingTop: "0.5em",
        marginTop: "0.3em",
    },
    buttons: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
    },
    button: {
        margin: "0.3em"
    },
    tempBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    }

}))


function WeatherService() {
    const classes = useStyles();
    const [weatherData, setWeatherData] = useState([])
    const [windData, setWindData] = useState([])
    const [mainData, setMainData] = useState([])
    const [data, setData] = useState([])
    const [apiUrl, setApiUrl] = useState("https://api.openweathermap.org/data/2.5/weather?q=Helsinki,fi&APPID=c05266c1f1d691111636ed114112dd6e&lang=fi")
    const hkiApi = "https://api.openweathermap.org/data/2.5/weather?q=Helsinki,fi&APPID=c05266c1f1d691111636ed114112dd6e&lang=fi"
    const esboApi = "https://api.openweathermap.org/data/2.5/weather?q=Espoo,fi&APPID=c05266c1f1d691111636ed114112dd6e&lang=fi"
    const vandaApi = "https://api.openweathermap.org/data/2.5/weather?q=Vantaa,fi&APPID=c05266c1f1d691111636ed114112dd6e&lang=fi"
    const [icon, setIcon] = useState("")
    const [iconURL, setIconURL] = useState("")

    useEffect(() => {
        fetch(apiUrl)
            .then(res => (
                res.json()).then(json => {
                    setWeatherData(json.weather[0])
                    setData(json)
                    setMainData(json.main)
                    setWindData(json.wind)
                    setIcon(json.weather[0].icon)
                }))
            .catch(e => console.log(e.error))
            fetch('https://openweathermap.org/img/w/' + icon + '.png')
            .then(res => setIconURL(res.url))

    }, [apiUrl, iconURL])

    function handleHkiClick() {
        setApiUrl(hkiApi)
    }
    function handleEsbClick() {
        setApiUrl(esboApi)
    }
    function handleVanClick() {
        setApiUrl(vandaApi)
    }

    return (
        <>
            <div className={classes.buttons}>
                <Typography className={classes.header} variant="h5" color="primary">Sää</Typography>
                <Button className={classes.button} size="small" variant="contained" color="primary" onClick={handleHkiClick}>Helsinki</Button>
                <Button className={classes.button} size="small" variant="contained" color="primary" onClick={handleEsbClick}>Espoo</Button>
                <Button className={classes.button} size="small" variant="contained" color="primary" onClick={handleVanClick}>Vantaa</Button>
            </div>

            {!data ? "Ladataan.." :
                <div className={classes.weatherResult}>
                    <Typography align="center" variant="h5">
                        {data.name}
                    </Typography>
                    <div className={classes.tempBox}>
                        <Typography variant="h4">
                            {Math.round((mainData.temp - 273.15) * 10) / 10}°C
                        </Typography>
                        <img style={{ width: '70px' }} src={iconURL} />
                    </div>
                    <div className={classes.tempBox}>
                    <Typography variant="body">
                        Säätila: <b> {weatherData.description} </b>
                    </Typography>
                    </div>
                    <div className={classes.tempBox}>
                    <Typography variant="subtitle2">
                        Tuuli: <b> {windData.speed} </b> m/s
                        <b> {windData.deg < 22.5 || windData.deg > 337.5 ? "Pohjoistuulta" :
                            (windData.deg < 337.5 && windData.deg > 292.5 ? "Luoteistuulta" : "")}
                            {windData.deg < 67.5 && windData.deg > 22.5 ? "Koilistuulta" :
                                (windData.deg < 112.5 && windData.deg > 67.5 ? "Itätuulta" : "")}
                            {windData.deg < 157.5 && windData.deg > 112.5 ? "Kaakkoistuulta" :
                                (windData.deg < 202.5 && windData.deg > 157.5 ? "Etelätuulta" : "")}
                            {windData.deg < 247.5 && windData.deg > 202.5 ? "Lounaistuulta" :
                                (windData.deg < 292.5 && windData.deg > 247.5 ? "Länsituulta" : "")} </b>
                    </Typography>
                    </div>
                </div>
            }
        </>
    )
}


export default WeatherService