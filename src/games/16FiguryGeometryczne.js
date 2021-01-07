import rectangle from '../assets/images/rectangle.png';
import circle from '../assets/images/circle.png';
import triangle from '../assets/images/triangle.png';
import hexagon from '../assets/images/hexagon.png';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './16FiguryGeometryczne.scss';

function FiguryGeometryczne(prop) {
  const taskCommands = [
    'Jak nazywa się ta figura?',
    'Wskaż '
  ];
  const figures = [
    'prostokąt',
    'koło',
    'trójkąt',
    'sześciokąt'
  ];
  const order = [
    1,2,3,4
  ];
  const images = [rectangle, circle, triangle, hexagon];

  const [game, setGame] = useState({
    task: 0,
    figure: 0,
    answers: []
  });

  function random(max) {
    return Math.floor(Math.random() * max);
  }

  function newGame() {

    setGame({
      task: random(2),
      figure: random(4),
      answers: getAnswers()
    });
  }

  function getAnswers() {
    return shuffle(order);
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function checkAnswer(answer) {
    if(answer === game.figure) {
      prop.onCorrectAnswer();
    } else {
      prop.onIncorrectAnswer();
    }
    newGame();
  }

  useEffect(() => {
    newGame();
  }, []);

  function displayAnswers() {
    if(game.task === 0) {
      return (
        <div className="answers">
          {figures.map((e, i) =>
            <div style={{order: game.answers[i]}} onClick={() => checkAnswer(i)} key={i}>
              {e}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="answers">
          {images.map((e, i) =>
            <div style={{order: game.answers[i]}} onClick={() => checkAnswer(i)} key={i}>
              <img src={e} alt="Odpowiedź"/>
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <div className="FiguryGeometryczne">
      <h2>{game.task === 0 ? taskCommands[0] : taskCommands[1] + figures[game.figure]}</h2>
      {game.task === 0 && <div className="figure">
        <img src={images[game.figure]} alt="Figura geometryczna"/>
      </div>}
      {displayAnswers()}
    </div>
  );
}

FiguryGeometryczne.propTypes = {
  onCorrectAnswer: PropTypes.function,
  onIncorrectAnswer: PropTypes.function
};

export default FiguryGeometryczne;
