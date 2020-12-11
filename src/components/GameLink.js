import React from 'react';
import './GameLink.scss';
import PropTypes from 'prop-types';
import award from '../assets/images/trophy.svg';
import GamesState from './GamesState';
import {Link} from 'react-router-dom';

function GameLink(prop) {
  const game = GamesState.state[prop.classNumber][prop.gameNumber];

  return (
    <Link to={`/game/${prop.classNumber}/${prop.gameNumber}`} className="GameLink">
      <h2>{game.name}</h2>
      <img src={award} alt="Nagroda"/>
      <div>{GamesState.getAwards(game.correct)}</div>
    </Link>
  );
}

GameLink.propTypes = {
  classNumber: PropTypes.string,
  gameNumber: PropTypes.number,
  game: PropTypes.object
};

export default GameLink;
