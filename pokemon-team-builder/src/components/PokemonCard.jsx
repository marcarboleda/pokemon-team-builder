import React, { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useTeam } from '../contexts/TeamContext';

const PokemonCard = ({ pokemon }) => {
  const { data: pokemonData, loading, error } = useFetch(pokemon.url);
  const { addPokemon, isPokemonInTeam, isTeamFull } = useTeam();
  const [imageLoading, setImageLoading] = useState(true);

  const handleAddToTeam = () => {
    if (pokemonData && !isPokemonInTeam(pokemonData.id) && !isTeamFull()) {
      addPokemon({
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.other['official-artwork'].front_default || 
               pokemonData.sprites.front_default,
        types: pokemonData.types.map(type => type.type.name),
        stats: pokemonData.stats,
        height: pokemonData.height,
        weight: pokemonData.weight,
        abilities: pokemonData.abilities
      });
    }
  };

  if (loading) return <div className="pokemon-card"><div className="loading">Loading...</div></div>;
  if (error || !pokemonData) return <div className="pokemon-card"><div className="error">Failed to load Pokémon</div></div>;

  const isInTeam = isPokemonInTeam(pokemonData.id);
  const teamFull = isTeamFull();
  const buttonDisabled = isInTeam || teamFull;
  const hpStat = pokemonData.stats.find(stat => stat.stat.name === 'hp');
  const attackStat = pokemonData.stats.find(stat => stat.stat.name === 'attack');

  return (
    <div className={`pokemon-card ${isInTeam ? 'in-team' : ''}`}>
      <div className="pokemon-id">#{pokemonData.id.toString().padStart(3, '0')}</div>
      
      <div className="pokemon-image-container">
        {imageLoading && <div className="image-loading">Loading...</div>}
        <img
          src={pokemonData.sprites.other['official-artwork'].front_default || 
               pokemonData.sprites.front_default}
          alt={pokemonData.name}
          className="pokemon-image"
          style={{ display: imageLoading ? 'none' : 'block' }}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
      </div>

      <h3>{pokemonData.name}</h3>

      <div className="pokemon-details">
        <div className="detail-item">
          <span className="detail-label">Height</span>
          <span className="detail-value">{(pokemonData.height / 10).toFixed(1)} m</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Weight</span>
          <span className="detail-value">{(pokemonData.weight / 10).toFixed(1)} kg</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">HP</span>
          <span className="detail-value">{hpStat?.base_stat || 'N/A'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Attack</span>
          <span className="detail-value">{attackStat?.base_stat || 'N/A'}</span>
        </div>
      </div>
      
      <div className="pokemon-types">
        {pokemonData.types.map((type, index) => (
          <span key={index} className={`pokemon-type type-${type.type.name}`}>
            {type.type.name}
          </span>
        ))}
      </div>

      <button onClick={handleAddToTeam} disabled={buttonDisabled} className={buttonDisabled ? 'disabled' : ''}>
        {isInTeam ? '✓ In Team' : teamFull ? 'Team Full' : 'Add to Team'}
      </button>
    </div>
  );
};

export default PokemonCard;