import React, {useEffect, useState} from 'react';
import './Section.scss';
import award from '../assets/images/trophy.svg';
import {Link, useParams} from 'react-router-dom';
import GamesState from '../components/GamesState';
import PropTypes from 'prop-types';

function Section(props) {
  const { classNumber, gameIndex } = useParams();
  const game = GamesState.state[classNumber][gameIndex];

  const [correct, setCorrect] = useState(game.correct);
  const [incorrect, setIncorrect] = useState(game.incorrect);
  const [fade, setFade] = useState(false);
  const [status, setStatus] = useState('');

  function onCorrectAnswer() {
    if(GamesState.getLeftToAward(correct) === 1) {
      setStatus('award');
    } else {
      setStatus('positive');
    }
    setFade(true);
    setCorrect(correct + 1);
    GamesState.addCorrect(classNumber, gameIndex);
  }

  function onIncorrectAnswer() {
    GamesState.addIncorrect(classNumber, gameIndex);
    setFade(true);
    setStatus('negative');
    setIncorrect(incorrect + 1);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      props.onSecondPassed();
    }, 1000);

    return () => clearTimeout(timer);
  });


  return (
    <div className="Section">
      <div className={'status ' + (fade ? 'fade ' : ' ') + (status)} onAnimationEnd={() => setFade(false)}/>
      <Link className="backLink" to={`/sections/${classNumber}`}>Zmień dział</Link>
      <h1>{game.name}</h1>
      <div className="game">
        {GamesState.list[classNumber][gameIndex].component({
          onCorrectAnswer: onCorrectAnswer,
          onIncorrectAnswer: onIncorrectAnswer
        })}
      </div>
      <div className="stats">
        <div>
          <div>Poprawnych: {correct}</div>
          <div>Błędnych: {incorrect}</div>
          <div>
          Czas twojej nauki:
            {new Date(1000 * props.timer).toISOString().substr(14, 5)}<br/>
          </div>
        </div>
        <div>
          <div>
            Poprawnych odpowiedzi <br/>
            do następnej nagrody:
            {GamesState.getLeftToAward(correct)}
          </div>
          <div>
            Liczba nagród: {GamesState.getAwards(correct)}
            <img src={award} alt="Nagroda"/>
          </div>
        </div>
      </div>
    </div>
  );
}

Section.propTypes = {
  timer: PropTypes.number,
  onSecondPassed: PropTypes.func
};

export default Section;
