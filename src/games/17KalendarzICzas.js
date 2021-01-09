import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './17KalendarzICzas.scss';
import Voice from '../components/Voice';

function KalendarzICzas(prop) {

  const seasons = [
    'wiosna',
    'lato',
    'jesień',
    'zima'
  ];

  const seasonsInTaskCommand = ['wiosną', 'latem', 'jesienią', 'zimą'];

  const [game, setGame] = useState({
    correctSeason: 0,
    taskCommand: '',
    answers: []
  });

  function random(max) {
    return Math.floor(Math.random() * max);
  }

  function newGame() {
    const randomIndex = random(4);
    const seasonInTaskCommand = seasonsInTaskCommand[randomIndex];
    const taskCommand = 'Która pora roku jest przed '+seasonInTaskCommand + '?';

    const answers = seasons.slice();
    answers.splice(randomIndex, 1);

    const correctSeason = randomIndex > 0 ? seasons[randomIndex-1] : seasons[3];

    setGame({
      correctSeason: correctSeason,
      taskCommand: taskCommand,
      answers: answers
    });
  }

  function checkAnswer(answer) {
    console.log(answer);
    console.log(game.correctSeason);
    if (answer === game.correctSeason) {
      prop.onCorrectAnswer();
    } else {
      prop.onIncorrectAnswer();
    }
    newGame();
  }

  useEffect(() => {
    newGame();
  }, []);

  return (
    <div className="KalendarzICzas">
      <Voice text={game.taskCommand}/>
      <div className="answers">
        {game.answers.map((e, i) =>
          <div onClick={() => checkAnswer(e)} key={i}>{e}</div>
        )}
      </div>
    </div>
  );
}

KalendarzICzas.propTypes = {
  onCorrectAnswer: PropTypes.function,
  onIncorrectAnswer: PropTypes.function
};

export default KalendarzICzas;
