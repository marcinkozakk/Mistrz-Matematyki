import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './26LiczbyRzymskie.scss';

function LiczbyRzymskie(prop) {
  const taskCommand = 'Co to za liczba rzymska?';
  const maxNumber = 12;

  const romanNumbers = [
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
    'X',
    'XI',
    'XII'
  ];

  const [game, setGame] = useState({
    correctNumber: 0,
    romanNumber: '',
    answers: []
  });

  function random(max) {
    return Math.floor(Math.random() * max);
  }

  function newGame() {
    const correctNumber = random(maxNumber) + 1;
    const romanNumber = romanNumbers[correctNumber - 1];

    setGame({
      correctNumber: correctNumber,
      romanNumber: romanNumber,
      answers: getAnswers(correctNumber)
    });
  }

  function getAnswers(correct) {
    const answers = [0, 0];
    while (answers[0] < 1 || answers[0] > 20 || answers[0] === correct) {
      answers[0] = correct + ((random(maxNumber / 2 + 1)) - (maxNumber / 4));
    }
    while (answers[1] < 1 || answers[1] > 20 || answers[1] === correct || answers[1] === answers[0]) {
      answers[1] = correct + ((random(maxNumber / 2 + 1)) - (maxNumber / 4));
    }
    answers.splice(random(3), 0, correct);

    return answers;
  }

  function checkAnswer(answer) {
    if (answer === game.correctNumber) {
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
    <div className="LiczbyRzymskie">
      <h2>{taskCommand}</h2>
      <div className="task">
        <h2>{game.romanNumber}</h2>
      </div>
      <div className="answers">
        {game.answers.map((e, i) =>
          <div onClick={() => checkAnswer(e)} key={i}>{e}</div>
        )}
      </div>
    </div>
  );
}

LiczbyRzymskie.propTypes = {
  onCorrectAnswer: PropTypes.function,
  onIncorrectAnswer: PropTypes.function
};

export default LiczbyRzymskie;