import React from 'react'
import { TeamProvider } from './contexts/TeamContext'
import TeamView from './components/TeamView'
import Pokedex from './components/Pokedex'
import './index.css'

function App() {
  return (
    <TeamProvider>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <div className="logo">
              <div className="pokeball"></div>
              <h1>PokéTeam Builder</h1>
            </div>
            <p>Build your ultimate team of 6 Pokémon from the Kanto region</p>
            <div className="header-stats">
              <div className="stat-item">Kanto Region</div>
              <div className="stat-item">151 Pokémon</div>
              <div className="stat-item">18 Types</div>
            </div>
          </div>
        </header>

        <main className="app-main">
          <div className="team-section">
            <TeamView />
          </div>
          <div className="pokedex-section">
            <Pokedex />
          </div>
        </main>

        <footer className="app-footer">
          <p>Developed by Marc Arboleda</p>
        </footer>
      </div>
    </TeamProvider>
  )
}

export default App