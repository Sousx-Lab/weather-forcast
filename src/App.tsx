import { FormEvent, useEffect, useState } from 'react'
import './assets/scss/App.scss'
import { getWeatherByCity, getWeatherByGeolocation } from './services/Api'
import type { IWeather } from './types/weather'
import ForcastDateTime from './components/ForcastDateTime'
import WeatherIcon from './components/WeatherIcon'
import SunsetIcon from './assets/weather-icon/sunset.svg'
import SunriseIcon from './assets/weather-icon/sunrise.svg'
import WindSockIcon from './assets/weather-icon/windsock.svg'
import HumidityIcon from './assets/weather-icon/humidity.svg'
import CardSlider from './components/CardSlider'
import Loader from './components/Loader'
export default function App() : JSX.Element {
  
  const [geo , setGeo] = useState<{lat: number|null, lon: number|null}>({
    lat: null,
    lon: null
  })
  const [city , setCity] = useState<string>('') 
  const [weather , setWeather] = useState<IWeather|null>(null)
  const [error , setError] = useState<string |null>(null)
  const [loading , setLoading] = useState(false)
 
  async function getGeo (): Promise<void> {
    if(navigator.geolocation){
      setLoading(true)
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude , longitude } = position.coords
        setGeo({ lat: latitude , lon: longitude })
        setLoading(false)
        return
      }, () => {setError('Geolocation is not supported by this browser')})
    }
    return 
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await getWeatherByCity(city)
      setWeather(response)
      setLoading(false)
    } catch (error: any) {
      setError(error?.message)
      setLoading(false)
    }
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
    <div className="container vh-100">
      <header className="header pt-5">
        <h1 className='fs-3 text-center'>Prévision météo sur 5 Jours</h1>
      </header>
      <form className='col-6 mx-auto mb-5' onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="city">Ville</label>
          <input type="text" className="form-control mb-2" placeholder="Paris" value={city} onChange={e => setCity(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary mt-1">Chercher</button>
      </form>
      {loading && <Loader/>}
        { weather?.list && (
          <>
          <p className='fs-4 m-0'>Ville : { weather?.city.name} - <small>{weather?.city.country}</small></p>
              <p className='m-0'>Coucher du soleil à {new Date(weather.city.sunset*1000).toLocaleTimeString()}
                <img src={SunsetIcon} alt="sunrise icon" width={48} />
              </p>
            <p>Lever du soleil à {new Date(weather.city.sunrise*1000).toLocaleTimeString()}  
              <img src={SunriseIcon} alt="sunset icon" width={48} />
            </p>
            <CardSlider >
            { weather?.list.map((day, k) => (
                <div key={k} className="card text-white bg-primary bg-gradient">
                  <WeatherIcon icon={day.weather[0]?.icon}/>
                  
                <div className="card-body ms-2 me-2">
                  <ForcastDateTime timeStamp={day?.dt} day={day.sys.pod} />
                  <div className="text-center">
                    <p className='fs-4 fw-bolder'>{Math.round(day.main.temp)} <span className='fw-normal'>°C</span> </p>
                    </div>
                    <p className='fs-5 text-center mt-3'>{day.weather[0].description.charAt(0).toUpperCase() + day.weather[0].description.slice(1)  }</p>
                    <div className='d-flex justify-content-center'>
                      <div className='ms-4' title='Vend | Wind'><small>{Math.round(day?.wind.speed)}Km/h</small>
                        <img className='d-inline' src={WindSockIcon} alt="wind sock icon" width={38}/>
                      </div>
                      <div title='Humidité | Humudity'><small>{Math.round(day?.main.humidity)}%</small>
                        <img className='d-inline' src={HumidityIcon} alt="wind sock icon" width={38} />
                      </div>
                    </div>
                </div>
              </div>

            ))}
          </CardSlider>
        </>
        )}
        
    </div>
  )
}