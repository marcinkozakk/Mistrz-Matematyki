import React from 'react';
import './GameLink.scss';
import PropTypes from 'prop-types';
import award from '../assets/images/trophy.svg';
import GamesState from './GamesState';
import {Link} from 'react-router-dom';

function GameLink(prop) {
  const classNumber = 1;
  const section = 1;
  const game = GamesState.state[classNumber][section];

  return (
    <Link to={`/game/${prop.classNumber}/${prop.gameNumber}`} className="GameLink">
      <h2>{game.name}</h2>
      <img src={award} alt="Award"/>
      <div>{GamesState.getAwards(game.correct)}</div>
    </Link>
  );
}

GameLink.propTypes = {
  classNumber: PropTypes.string,
  game: PropTypes.object,
  key: PropTypes.number
};

export default GameLink;
