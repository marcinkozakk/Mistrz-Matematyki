import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './14PieniadzeIZakupy.scss';
import zl1 from '../assets/images/coins/1zl.png';
import zl2 from '../assets/images/coins/2zl.png';
import zl5 from '../assets/images/coins/5zl.png';

function PieniadzeIZakupy(prop) {

  const taskCommand = 'Ile tu jest pieniędzy?';
  const coinsImages = [zl1, zl2, zl5];
  const coins = [1,2,5];

  const [game, setGame] = useState({
    correctAnswer: 0,
    images: [],
    answers: []
  });

  function random(max) {
    return Math.floor(Math.random() * max);
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function newGame() {

    let images = [];
    let sum = 0;
    let randomIndex;

    for (let i = 0; i < 3; i++) {
      randomIndex = random(coins.length);
      images.push(coinsImages[randomIndex]);
      sum+=coins[randomIndex];
    }

    setGame({
      correctAnswer: sum,
      images: images,
      answers: shuffle([sum-1, sum, sum+1])
    });
  }

  function checkAnswer(answer) {
    if (answer === game.correctAnswer) {
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
    <div className="PieniadzeIZakupy">
      <h2>{taskCommand}</h2>
      <div className='images'>
        {[...Array(3)].map((e, i) =>
          <img key={i} src={game.images[i]} alt="Moneta"/>
        )}
      </div>
      <div className="answers">
        {game.answers.map((e, i) =>
          <div onClick={() => checkAnswer(e)} key={i}>{e} zł</div>
        )}
      </div>
    </div>
  );
}

PieniadzeIZakupy.propTypes = {
  onCorrectAnswer: PropTypes.function,
  onIncorrectAnswer: PropTypes.function
};

export default PieniadzeIZakupy;
