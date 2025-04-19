import React, { useContext } from 'react'
import './App.css'

import { WeatherContext } from './WeatherContext'

export const LocationSuggestion = () => {
    const {searchQuery, suggestion, setLonLatData} = useContext(WeatherContext)

    const suggestionChoice = async (place) => {
    const apiKey = 'b97575b21c57260bfb787231c7ca4e08'
      try {
        const lonLatRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${place.lat}&lon=${place.lon}&appid=${apiKey}&units=metric`)
        const lonLatData = await lonLatRes.json()
        setLonLatData(lonLatData)
        console.log(lonLatData)
      } catch (error) {
        console.log(`Error Fetching Longitude and Latitude: ${error}`)
      }
    }
  
  return (
    <>
      <div className='suggestions'>
          {searchQuery && suggestion && suggestion.length > 0 && (suggestion.map((eachSuggestion, index) => (
              <p 
                key={index}
                onClick={() => {suggestionChoice(eachSuggestion)}}
              >
                {eachSuggestion.name} {eachSuggestion.state}, {eachSuggestion.country}
              </p>
            )))
          }
      </div>
    </>
    
  )
}
