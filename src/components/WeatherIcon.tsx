import React, { useEffect } from "react";
import ClearDay from '../assets/weather-icon/clear-day.svg'
import ClearNight from '../assets/weather-icon/clear-night.svg'
import Cloudy from '../assets/weather-icon/cloudy.svg'
import CloudyDay from '../assets/weather-icon/cloudy-day.svg'
import CloudyNight from '../assets/weather-icon/cloudy-night.svg'
import OvercastDay from '../assets/weather-icon/overcast-day.svg'
import OvercastNight from '../assets/weather-icon/overcast-night.svg'
import Overcast from  '../assets/weather-icon/overcast-rain.svg'
import OvercastNightRain from '../assets/weather-icon/overcast-night-rain.svg'
import OvercastDayRain from '../assets/weather-icon/overcast-day-rain.svg'
import ThunderStormsDay from '../assets/weather-icon/thunderstorms-day.svg'
import ThunderStormsNight from '../assets/weather-icon/thunderstorms-night.svg'
import Snow from '../assets/weather-icon/snow.svg'
import DayHaze from '../assets/weather-icon/overcast-day-haze.svg'
import NightHaze from '../assets/weather-icon/overcast-night-haze.svg'
export default function WeatherIcon({ icon }: { icon: string }): JSX.Element {

  const iconMap: {[key: string]: string} = {
    '01d': ClearDay,
    '01n': ClearNight,
    '02d': Cloudy,
    '02n': Cloudy,
    '03d': CloudyDay,
    '03n': CloudyNight,
    '04d': OvercastDay,
    '04n': OvercastNight,
    '09d': Overcast,
    '09n': Overcast,
    '10d': OvercastDayRain,
    '10n': OvercastNightRain,
    '11d': ThunderStormsDay,
    '11n': ThunderStormsNight,
    '13d': Snow,
    '13n': Snow,
    '50d': DayHaze,
    '50n': NightHaze,
  }
  useEffect(() => {
    console.log(iconMap[icon])
  }, [])
  return (
    <img src={iconMap[icon]!} className="card-img-top mx-auto" alt="Weather icon" style={{width: "200px"}}/>
  );
}