import React, { useEffect, useState } from 'react'
import './index.scss'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl'

export function App() {
  const [viewport, setViewport] = useState({
    width: 500,
    height: 400,
    latitude: 0,
    longitude: 0,
    zoom: 0,
  })

  const [earthquakes, setEarthquakes] = useState([])

  useEffect(() => {
    async function loadEarthquakes() {
      const url = ('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson')
      const response = await fetch(url)
      const json = await response.json()
      setEarthquakes(json.features)
    }
    loadEarthquakes()
    
  }, [])

  return (
    <>
      <header>
        <div className="d-flex justify-content-center display-2 hero-text">Earthquake!</div>
      </header>
      <main>
        <section className="list">
          <ul>
            {earthquakes.map((earthquake) => (
              <li key={earthquake.id}>{earthquake.properties.place},{earthquake.geometry.coordinates[1]},{earthquake.geometry.coordinates[0]}</li>
            ))}
          </ul>
        </section>
        <section className="map">
          <ReactMapGL
            style={{ position: 'absolute' }}
            {...viewport}
            onViewportChange={setViewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            >
              {earthquakes.map((earthquake) => (
                <Marker
                  key={earthquake.id}
                  latitude={earthquake.geometry.coordinates[1]}
                  longitude={earthquake.geometry.coordinates[0]}
                >
                   <span role="img" aria-label="taco">
                    &#x1F4cd;
                  </span>
                </Marker>
              ))}
              <div style={{ position: 'absolute', right: 0 }}>
                <NavigationControl />
              </div>
            </ReactMapGL>
        </section>
      </main>
    </>
  )
}
