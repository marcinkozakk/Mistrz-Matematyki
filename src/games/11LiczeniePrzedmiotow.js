import a from '../assets/images/things/candy.svg';
import b from '../assets/images/things/clock.svg';
import c from '../assets/images/things/cut.svg';
import d from '../assets/images/things/desktop.svg';
import e from '../assets/images/things/hat.svg';
import f from '../assets/images/things/pencil.svg';
import g from '../assets/images/things/sun.svg';
import h from '../assets/images/things/teddy-bear.svg';
import i from '../assets/images/things/pet.svg';
import j from '../assets/images/things/sports-car.svg';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './11LiczeniePrzedmiotow.scss';

function LiczeniePrzedmiotow(prop) {
  const taskCommand = 'Ile widzisz przedmiotów?';
  const maxNumber = 16;
  const images = [a, b, c, d, e, f, g, h, i, j];

  const [game, setGame] = useState({
    randomImage: 0,
    correctNumber: 0,
    isBigNumber: false,
    answers: []
  });

  function random(max) {
    return Math.floor(Math.random() * max);
  }

  function newGame() {
    const correctNumber = random(maxNumber) + 1;
    const randomImage = random(images.length);
    const isBigNumber = correctNumber > 10;

    setGame({
      isBigNumber: isBigNumber,
      randomImage: randomImage,
      correctNumber: correctNumber,
      answers: getAnswers(correctNumber)
    });
  }

  function getAnswers(correct) {
    const answers = [0, 0];
    while(answers[0] < 1 || answers[0] > 20 || answers[0] === correct) {
      answers[0] = correct + ((random(maxNumber / 2 + 1)) - (maxNumber / 4));
    }
    while (answers[1] < 1 || answers[1] > 20 || answers[1] === correct || answers[1] === answers[0]) {
      answers[1] = correct + ((random(maxNumber / 2 + 1)) - (maxNumber / 4));
    }
    answers.splice(random(3), 0, correct);

    return answers;
  }

  function checkAnswer(answer) {
    if(answer === game.correctNumber) {
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
    <div className="LiczeniePrzedmiotow">
      <h2>{taskCommand}</h2>
      <div className={'images' + (game.isBigNumber ? ' bigNumber' : '')}>
        {[...Array(game.correctNumber)].map((e, i) =>
          <img key={i} src={images[game.randomImage]} alt="Przedmiot"/>
        )}
      </div>
      <div className="answers">
        {game.answers.map((e, i) =>
          <div onClick={() => checkAnswer(e)} key={i}>{e}</div>
        )}
      </div>
    </div>
  );
}

LiczeniePrzedmiotow.propTypes = {
  onCorrectAnswer: PropTypes.function,
  onIncorrectAnswer: PropTypes.function
};

export default LiczeniePrzedmiotow;
