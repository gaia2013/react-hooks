import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const pitoshiInfo = {
  name: 'pitoshi',
  age: 24
}

export const PitoshiContext = createContext(pitoshiInfo)

ReactDOM.createRoot(document.getElementById('root')).render(
  <PitoshiContext.Provider value={pitoshiInfo}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </PitoshiContext.Provider>,
)

export default PitoshiContext