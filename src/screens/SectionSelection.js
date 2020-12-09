import React from 'react';
import './SectionSelection.scss';
import games from '../components/GamesState';
import {Link, useParams} from 'react-router-dom';
import GameLink from '../components/GameLink';

function SectionSelection(){
  let { classNumber } = useParams();

  return (
    <div className="SectionSelection">
      <Link className="backLink" to="/classes">Zmień klasę</Link>
      <h1>Klasa {classNumber}</h1>
      <div className="sections">
        {games.list[classNumber].map((game, i) => {
          return (<GameLink key={i} game={game} gameNumber={i} classNumber={classNumber} />);
        })}
      </div>
    </div>
  );
}

export default SectionSelection;
