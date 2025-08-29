import React from 'react';
import { useTeam } from '../contexts/TeamContext';

const TeamView = () => {
  const { team, removePokemon, clearTeam } = useTeam();
  const teamSlots = Array(6).fill(null).map((_, index) => team[index] || null);

  return (
    <div>
      <h2>Your Pokémon Team</h2>
      
      <div className="team-counter">{team.length}/6 Pokémon</div>

      <div className="team-slots">
        {teamSlots.map((pokemon, index) => (
          <div key={index} className={`team-slot ${pokemon ? 'filled' : ''}`}>
            {pokemon ? (
              <>
                <img src={pokemon.image} alt={pokemon.name} className="team-pokemon-image" />
                <h4>{pokemon.name}</h4>
                <div className="team-pokemon-types">
                  {pokemon.types.map((type, i) => (
                    <span key={i} className={`pokemon-type type-${type}`}>{type}</span>
                  ))}
                </div>
                <button onClick={() => removePokemon(pokemon.id)} className="remove-button">
                  Remove
                </button>
              </>
            ) : (
              <>
                <div className="empty-slot-icon">+</div>
                <span className="empty-slot-text">Slot {index + 1}</span>
                <div className="empty-slot-label">Empty</div>
              </>
            )}
          </div>
        ))}
      </div>

      {team.length > 0 && (
        <button onClick={clearTeam} className="clear-team-button">
          Clear Entire Team
        </button>
      )}

      {team.length === 6 && (
        <div className="team-complete-message">
          🎉 Your team is complete! Ready for adventure!
        </div>
      )}
    </div>
  );
};

export default TeamView;