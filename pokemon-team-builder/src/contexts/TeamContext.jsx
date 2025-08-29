import React, { createContext, useContext, useState, useEffect } from 'react';

const TeamContext = createContext();

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) throw new Error('useTeam must be used within a TeamProvider');
  return context;
};

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const savedTeam = localStorage.getItem('pokemonTeam');
    if (savedTeam) setTeam(JSON.parse(savedTeam));
  }, []);

  useEffect(() => {
    localStorage.setItem('pokemonTeam', JSON.stringify(team));
  }, [team]);

  const addPokemon = (pokemon) => {
    if (team.length < 6 && !team.find(p => p.id === pokemon.id)) {
      setTeam([...team, pokemon]);
    }
  };

  const removePokemon = (id) => setTeam(team.filter(p => p.id !== id));
  const clearTeam = () => setTeam([]);
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