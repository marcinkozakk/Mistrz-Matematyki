import React from 'react';
import './SectionSelection.scss';
import games from '../components/GamesState';
import {Link, useParams} from 'react-router-dom';
import GameLink from '../components/GameLink';

function SectionSelection(){
  let { classNumber } = useParams();
  let isReadyForDiploma = true;

  for(let i = 0; i < games.state[classNumber].length; ++i) {
    if(!games.isReadyToDiploma(classNumber, i)) {
      isReadyForDiploma = false;
      break;
    }
  }

  function diplomaSection() {
    if(isReadyForDiploma) {
      return (
        <Link to={'/diploma/' + classNumber} target="_blank" onClick={(e) => {
          const name = window.prompt('Dla kogo ma być dyplom?', window.localStorage.getItem('name') || '');
          if(name !== null) {
            window.localStorage.setItem('name', name);
          } else {
            e.preventDefault();
          }
        }}>
          Drukuj dyplom
        </Link>
      );
    } else {
      return (
        <div>Aby wydrukować dyplom musisz w każdym dziale zdobyć puchar i mieć więcej poprawnych niż błędnych odpowiedzi</div>
      );
    }
  }

  return (
    <div className="SectionSelection">
      <Link className="backLink" to="/classes">Zmień klasę</Link>
      <h1>Klasa {classNumber}</h1>
      <div className="sections">
        {games.list[classNumber].map((game, i) => {
          return (<GameLink key={i} game={game} gameNumber={i} classNumber={classNumber} />);
        })}
      </div>
      <div className="diploma">
        {diplomaSection()}
      </div>
    </div>
  );
}

export default SectionSelection;
