import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './24PieniadzeIZakupy.scss';
import zl1 from '../assets/images/coins/1zl.png';
import zl2 from '../assets/images/coins/2zl.png';
import zl5 from '../assets/images/coins/5zl.png';
import gr1 from '../assets/images/coins/1gr.png';
import gr2 from '../assets/images/coins/2gr.png';
import gr5 from '../assets/images/coins/5gr.png';
import gr10 from '../assets/images/coins/10gr.png';
import gr20 from '../assets/images/coins/20gr.png';
import gr50 from '../assets/images/coins/50gr.png';

function PieniadzeIZakupy(prop) {

  const taskCommand = 'Ile tu jest pieniędzy?';
  const coinsImages = [zl1, zl2, zl5, gr1, gr2, gr5, gr10, gr20, gr50];
  const coins = [100,200,500, 1, 2, 5, 10, 20, 50];

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

    for (let i = 0; i < 4; i++) {
      randomIndex = random(coins.length);
      images.push(coinsImages[randomIndex]);
      sum+=coins[randomIndex];
    }
    sum/=100;
    setGame({
      correctAnswer: sum.toFixed(2),
      images: images,
      answers: shuffle([sum.toFixed(2), (sum+0.1).toFixed(2), (sum+0.2).toFixed(2)])
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
        {[...Array(4)].map((e, i) =>
          <img key={i} src={game.images[i]} alt="Moneta"/>
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

PieniadzeIZakupy.propTypes = {
  onCorrectAnswer: PropTypes.function,
  onIncorrectAnswer: PropTypes.function
};

export default PieniadzeIZakupy;