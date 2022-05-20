import { useEffect, useState } from 'react'
import './assets/scss/App.scss'
import { getWeatherByCity, getWeatherByGeolocation } from './services/Api'
import {IWeather} from '../src/type/type'
import ForcastDateTime from './components/ForcastDateTime'
import WeatherIcon from './components/WeatherIcon'
import Sunset from './assets/weather-icon/sunset.svg'
import Sunrise from './assets/weather-icon/sunrise.svg'
export default function App() : JSX.Element {
  
  const [geo , setGeo] = useState<{lat: number|null, lon: number|null}>({
    lat: null,
    lon: null
  })
  const [city , setCity] = useState<null | string>('') 
  const [weather , setWeather] = useState<IWeather|null>(null)
  const [error , setError] = useState<string |null>(null)
  const [loading , setLoading] = useState(false)

  // const getWeather = async (e: Event) => {
  //   e.preventDefault()
  //   const { latitude , longitude } = geo
  //   setLoading(true)
  //   try {
  //     const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`)
  //     const data = await response.json()
  //     setWeather(data)
  //     setLoading(false)
  //   } catch (error) {
  //     setError(error)
  //     setLoading(false)
  //   }
  // }
 
  async function getGeo (): Promise<void> {
    if(navigator.geolocation){
      setLoading(true)
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude , longitude } = position.coords
        setGeo({ lat: latitude , lon: longitude })
        setLoading(false)
        return { latitude, longitude }
      }, () => {setError('Geolocation is not supported by this browser')})
    }
    return 
  }

  useEffect(() =>{
  (async () => {
      await getGeo()
    })()
   }, [])
  
  useEffect(() => {
    if(geo.lat && geo.lon){
      getWeatherByGeolocation(geo.lat, geo.lon, 'fr')
      .then(setWeather) 
      .catch(setError)
      }
  }, [geo])
  return (
    <div className="container">
      <header className="header">
      </header>
      <h1>Météo sur 5 Jours</h1>
        { weather?.list && (
          <>
            <p className='fs-5'>Ville : { weather.city.name} - <small>{weather.city.country}</small></p>
              <p className='mb-1'>Coucher du soleil à {new Date(weather.city.sunset*1000).toLocaleTimeString()}
                <img src={Sunset} alt="sunrise icon" width={50} />
              </p>
            <p>Lever du soleil à {new Date(weather.city.sunrise*1000).toLocaleTimeString()}  
              <img src={Sunset} alt="sunset icon" width={50} />
            </p>
            <div className="row d-flex justify-content-between">
            { weather?.list.map((day, k) => (
                <div key={k} className="card text-white bg-primary mb-3" style={{maxWidth: "20rem"}}>
                  <WeatherIcon icon={day.weather[0]?.icon}/>
                  
                <div className="card-body">
                  <ForcastDateTime timeStamp={day?.dt} day={day.sys.pod} />
                  <div className="text-center">
                    <p className='fs-4 fw-bold'>{Math.round(day.main.temp)} °C</p></div>
                    <p className='fs-5 text-center mt-3'>{day.weather[0].description.charAt(0).toUpperCase() + day.weather[0].description.slice(1)  }</p>
                </div>
              </div>

            ))}
          </div>
        </>
        )}
    </div>
  )
}