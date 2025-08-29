import React, { useState, useMemo } from 'react';
import { useFetch } from '../hooks/useFetch';
import PokemonCard from './PokemonCard';

const Pokedex = () => {
  const { data, loading, error } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPokemon = useMemo(() => {
    if (!data?.results) return [];
    return data.results.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data?.results, searchTerm]);

  if (loading) return <div className="loading">Loading Pokédex...</div>;
  if (error) return <div className="error">Error loading Pokédex: {error}</div>;

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search Pokémon by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="pokemon-grid">
        {filteredPokemon.map((pokemon, index) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>

      {filteredPokemon.length === 0 && searchTerm && (
        <div className="no-results">No Pokémon found matching "{searchTerm}"</div>
      )}
    </div>
  );
};

export default Pokedex;