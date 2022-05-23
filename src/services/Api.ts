export async function getWeatherByCity(city: string, lang: string|null = 'fr'): Promise<any> {
    const reponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`)
    if(reponse.ok) {
        return reponse.json()
    }
    throw new Error(reponse.statusText)

}

export async function getWeatherByGeolocation(lat: number, lon: number, lang: string|null = 'fr'): Promise<any> {
    const reponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=${lang}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`)
    if(reponse.ok) {
        return reponse.json()
    }
    throw new Error(reponse.statusText)

}