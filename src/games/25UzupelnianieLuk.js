import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './25UzupelnianieLuk.scss';

function UzupelnianieLuk(prop) {
  const maxNumber = 30;
  const taskCommand = 'Co wpisać w lukę, aby działania było prawidłowe?';

  const [game, setGame] = useState({
    operator: 0,
    variant: 0,
    randomNumbers: [0, 0],
    answers: [],
    correct: 0
  });

  function random(max) {
    return Math.floor(Math.random() * max);
  }

  function newGame() {
    let correct;
    const operator = random(4);
    let randomNumbers;
    if(operator < 2) {
      randomNumbers = [
        random(maxNumber) + 1
      ];
      if(operator === 0) {
        randomNumbers[1] = random(maxNumber - randomNumbers[0]);
        correct = randomNumbers[0] + randomNumbers[1];
      } else {
        randomNumbers[1] = random(randomNumbers[0]);
        correct = randomNumbers[0] - randomNumbers[1];
      }
    } else {
      randomNumbers = [
        random(10) + 1
      ];
      if(operator === 2) {
        correct = random(Math.floor(Math.min(maxNumber / randomNumbers[0], 10)));
        randomNumbers[1] = randomNumbers[0] * correct;
      } else {
        correct = random(Math.floor(Math.min(maxNumber / randomNumbers[0], 10))) + 1;
        randomNumbers[1] = randomNumbers[0] * correct;
      }
    }

    setGame({
      randomNumbers: randomNumbers,
      operator: operator,
      answers: getAnswers(correct),
      correct: correct,
      variant: random(2)
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

  function getTask() {
    if(game.operator === 0) {
      return <div>
        <div className="gap"/> - {game.randomNumbers[0]} = {game.randomNumbers[1]}
      </div>;
    } else if(game.operator === 1 && game.variant === 0) {
      return <div>
        {game.randomNumbers[1]} + <div className="gap"/> = {game.randomNumbers[0]}
      </div>;
    } else if(game.operator === 1 && game.variant === 1) {
      return <div>
        <div className="gap"/> + {game.randomNumbers[1]} = {game.randomNumbers[0]}
      </div>;
    } else if(game.operator === 2 && game.variant === 0) {
      return <div>
        {game.randomNumbers[0]} · <div className="gap"/> = {game.randomNumbers[1]}
      </div>;
    } else if(game.operator === 2 && game.variant === 1) {
      return <div>
        <div className="gap"/> · {game.randomNumbers[0]} = {game.randomNumbers[1]}
      </div>;
    } else {
      return <div>
        {game.randomNumbers[1]} : <div className="gap"/> = {game.randomNumbers[0]}
      </div>;
    }
  }

  return (
    <div className="UzupelnianieLuk">
      <h2>{taskCommand}</h2>
      <div className="task">
        {getTask()}
      </div>
      <div className="answers">
        {game.answers.map((e, i) =>
          <div onClick={() => checkAnswer(e)} key={i}>{e}</div>
        )}
      </div>
    </div>
  );
}

UzupelnianieLuk.propTypes = {
  onCorrectAnswer: PropTypes.function,
  onIncorrectAnswer: PropTypes.function
};

export default UzupelnianieLuk;
