import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './23MnozenieIDzielenie.scss';
import Voice from '../components/Voice';

function MnozenieIDzielenie(prop) {
  const maxNumber = 30;
  const taskCommand = 'Wskaż rozwiązanie działania';

  const [game, setGame] = useState({
    operator: 0,
    randomNumbers: [0, 0],
    answers: [],
    correct: 0
  });

  function random(max) {
    return Math.floor(Math.random() * max);
  }

  function newGame() {
    let correct;
    const operator = random(2);
    const randomNumbers = [
      random(10) + 1
    ];
    randomNumbers[1] = random(Math.floor(Math.min(maxNumber / randomNumbers[0], 10)));
    if(operator === 0) {
      correct = randomNumbers[0] * randomNumbers[1];
    } else {
      correct = randomNumbers[1];
      randomNumbers[1] = randomNumbers[0];
      randomNumbers[0] = randomNumbers[1] * correct;
    }

    setGame({
      randomNumbers: randomNumbers,
      operator: operator,
      answers: getAnswers(correct),
      correct: correct
    });
  }

  function getAnswers(correct) {
    const answers = [-1, -1];
    while(answers[0] === correct || answers[0] < 0) {
      answers[0] = random(maxNumber + 1);
    }
    while (answers[1] === correct || answers[1] === answers[0] || answers[1] < 0) {
      answers[1] = random(maxNumber + 1);
    }
    answers.splice(random(3), 0, correct);

    return answers;
  }

  function checkAnswer(answer) {
    if(answer === game.correct) {
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
    <div className="DodawanieIOdejmowanie">
      <Voice text={taskCommand}/>
      <div className="task">
        {game.randomNumbers[0]} {game.operator === 0 ? '·' : ':'} {game.randomNumbers[1]} =
      </div>
      <div className="answers">
        {game.answers.map((e, i) =>
          <div onClick={() => checkAnswer(e)} key={i}>{e}</div>
        )}
      </div>
    </div>
  );
}

MnozenieIDzielenie.propTypes = {
  onCorrectAnswer: PropTypes.function,
  onIncorrectAnswer: PropTypes.function
};

export default MnozenieIDzielenie;
