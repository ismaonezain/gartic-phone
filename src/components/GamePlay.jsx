import React, { useState } from 'react';

const GamePlay = () => {
  const [drawingPhase, setDrawingPhase] = useState(true);
  const [scores, setScores] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const handleScoreUpdate = (playerId, points) => {
    setScores(prevScores => ({
      ...prevScores,
      [playerId]: (prevScores[playerId] || 0) + points,
    }));
  };

  const handleNextPhase = () => {
    setDrawingPhase(!drawingPhase);
    setCurrentPlayer((currentPlayer + 1) % numPlayers);
  };

  return (
    <div>
      <h1>{drawingPhase ? 'Drawing Phase' : 'Guessing Phase'}</h1>
      <h2>Current Player: {currentPlayer + 1}</h2>
      <button onClick={handleNextPhase}>Next Phase</button>
      <div>
        <h3>Scores:</h3>
        {Object.entries(scores).map(([playerId, score]) => (
          <div key={playerId}>Player {parseInt(playerId) + 1}: {score}</div>
        ))}
      </div>
    </div>
  );
};

export default GamePlay;