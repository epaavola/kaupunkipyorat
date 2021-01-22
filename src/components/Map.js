import React, { useEffect, useRef } from 'react'
import L, { map } from 'leaflet'
import { useRecoilValue, useRecoilState } from 'recoil'
import { destinationState, originState, searchTextState, routeState } from './Atoms'
import { useLazyQuery, gql } from '@apollo/client'
import polyUtil from 'polyline-encoded'

const style = {
  width: "100%",
  height: "100%"
}

const ROUTE = gql`
  query planRoute($originLat: Float!, $originLon: Float!, $destinationLat: Float!, $destinationLon: Float!){
        plan(
          from: {lat: $originLat, lon: $originLon}
          to: {lat: $destinationLat, lon: $destinationLon}
          numItineraries: 1
          transportModes: [{mode: BICYCLE}]
        ) {
          itineraries {
            legs {
              startTime
              endTime
              from {
                name
              }
              to {
                name
              }
              trip {
                route {
                  shortName
                }
              }
              legGeometry {
                length
                points
              }
            }
          }
        }
  }`


const Map = ({ markersData }) => {

  function GetRoutes() {
    const [getRoute, result] = useLazyQuery(ROUTE)
    const [route, setRoute] = useRecoilState(routeState)
    const origin = useRecoilValue(originState)
    const destination = useRecoilValue(destinationState)

    const showRoute = (originLat, originLon, destinationLat, destinationLon) => {
      getRoute({
        variables: {
          originLat: originLat,
          originLon: originLon,
          destinationLat: destinationLat,
          destinationLon: destinationLon
        }
      })
    }

    useEffect(() => {
      if (origin !== null && destination !== null)
        showRoute(origin.lat, origin.lon, destination.lat, destination.lon)
    }, [origin, destination])

    useEffect(() => {
      if (result.data)
        setRoute(result.data)
    }, [result.data])

    return (
      <>
      </>
    )
  }

  const origin = useRecoilValue(originState)
  const destination = useRecoilValue(destinationState)
  const mapRef = useRef(null)
  const layerRef = useRef(null)
  const searchTerm = useRecoilValue(searchTextState)
  const route = useRecoilValue(routeState)
  const mapCenter = [60.2, 24.93]
  const SearchResults = !searchTerm ? []
    : markersData.filter(data =>
      data.name.toLowerCase().startsWith(searchTerm.toLocaleLowerCase()))



  // Luodaan kartta
  useEffect(() => {
    mapRef.current = L.map('map', {
      center: mapCenter,
      zoom: 12,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });
  }, [])

  // Lisätään taso merkeille
  useEffect(() => {
    layerRef.current = L.layerGroup().addTo(mapRef.current)
  }, [])

  // päivitetään merkit
  useEffect(() => {
    layerRef.current.clearLayers()
    SearchResults.forEach(data => {
      L.marker([data.lat, data.lon], { title: data.name })
        .bindPopup("<b>" + data.name + "</b><br>" + "Vapaat pyörät: " + data.bikesAvailable + "<br>" + "Tyhjät paikat: " + data.spacesAvailable)
        .addTo(layerRef.current)

    })
  }, [SearchResults])

  useEffect(() => {
    if (route.plan) {
      mapRef.current.flyTo([origin.lat, origin.lon],12)
      layerRef.current.clearLayers()
      route.plan.itineraries[0].legs.forEach((leg) => {
        let popup_content = "<h4>" + origin.name + " - " + destination.name + "</h4>";
        popup_content += "Lähtöaika: <b>" + new Date(leg.startTime).toLocaleTimeString().slice(0, 5) +
          "</b> <br> Saapumisaika: <b>" + new Date(leg.endTime).toLocaleTimeString().slice(0, 5) + "<br/>";

        L.marker([origin.lat, origin.lon], { title: origin.name })
          .bindPopup("<b>" + origin.name + "</b><br>" + "Vapaat pyörät: " + origin.bikesAvailable + "<br>" + "Tyhjät paikat: " + origin.spacesAvailable)
          .addTo(layerRef.current)

        L.marker([destination.lat, destination.lon], { title: destination.name })
          .bindPopup("<b>" + destination.name + "</b><br>" + "Vapaat pyörät: " + destination.bikesAvailable + "<br>" + "Tyhjät paikat: " + destination.spacesAvailable)
          .addTo(layerRef.current)

        const legPolyline = L.polyline([],
          {
            color: '#3f87cb',
            weight: 7
          }).bindPopup(popup_content)
          .addTo(layerRef.current)  
        const points = polyUtil.decode(leg.legGeometry.points);
        for (let i = 0; i < points.length; i++) {
          legPolyline.addLatLng(L.latLng(points[i][0], points[i][1]));
        }
        legPolyline.openPopup();
      })
    }
    
  }, [route])

  return (
    <>
      <GetRoutes zIndex="3"></GetRoutes>
      <div id="map" style={style} />
    </>
  )
}

export default Map