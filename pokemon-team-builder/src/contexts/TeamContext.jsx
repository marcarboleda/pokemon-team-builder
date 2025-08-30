import React, { createContext, useContext, useState, useEffect } from 'react';

const TeamContext = createContext();

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) throw new Error('useTeam must be used within a TeamProvider');
  return context;
};

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log('🔄 Loading team from localStorage...');
    try {
      const savedTeam = localStorage.getItem('pokemonTeam');
      
      if (savedTeam) {
        const parsedTeam = JSON.parse(savedTeam);
        setTeam(parsedTeam);
      } 
    } catch (error) {
      console.error('Error loading team:', error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('pokemonTeam', JSON.stringify(team));
      } catch (error) {
        console.error('Error saving team:', error);
      }
    }
  }, [team, isLoaded]); 

  const addPokemon = (pokemon) => {
    console.log('➕ Adding Pokémon:', pokemon.name);
    if (team.length < 6 && !team.find(p => p.id === pokemon.id)) {
      const newTeam = [...team, pokemon];
      console.log('New team will be:', newTeam);
      setTeam(newTeam);
    } else {
      console.log('Cannot add - team full or duplicate');
    }
  };

  const removePokemon = (id) => {
    console.log('➖ Removing Pokémon ID:', id);
    setTeam(team.filter(p => p.id !== id));
  };
  
  const clearTeam = () => {
    console.log('🧹 Clearing entire team');
    setTeam([]);
  };
  
  const isPokemonInTeam = (id) => team.some(p => p.id === id);
  const isTeamFull = () => team.length >= 6;

  return (
    <TeamContext.Provider value={{
      team, addPokemon, removePokemon, clearTeam, isPokemonInTeam, isTeamFull
    }}>
      {children}
    </TeamContext.Provider>
  );
};