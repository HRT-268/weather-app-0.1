import React from 'react'
import { WeatherProvider } from './WeatherContext'
import { SearchBar } from './SearchBar'
import { LocationSuggestion } from './LocationSuggestion'
import { WeatherDisplay } from './WeatherDisplay'
import './index.css'
import './App.css'


function App() {
  
  return (
    <div className='container'>      
      
      <WeatherProvider>
        <SearchBar />
        <LocationSuggestion />
        <WeatherDisplay />
      </WeatherProvider>

    </div>
  )
}

export default App
