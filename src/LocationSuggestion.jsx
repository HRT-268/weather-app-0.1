import React, { useContext } from 'react'

import { WeatherContext } from './WeatherContext'

export const LocationSuggestion = () => {
    const {searchQuery, suggestion} = useContext(WeatherContext)
  
  return (
    <>
      <div className='suggestions'>
          {searchQuery && suggestion && suggestion.length > 0 && (suggestion.map((suggestion, index) => (
              <p 
                key={index}
              >
                {suggestion.name} {suggestion.place}, {suggestion.country}
              </p>
            )))
          }
      </div>
    </>
    
  )
}
