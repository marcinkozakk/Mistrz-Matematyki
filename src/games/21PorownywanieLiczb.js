import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './21PorownywanieLiczb.scss';
import Voice from '../components/Voice';

function PorownywanieLiczb(prop) {
  const maxNumber = 100;
  const taskCommand = 'Wstaw odpowiedni znak w lukę';

  const [game, setGame] = useState({
    randomNumbers: [0, 0],
  });

  function random(max) {
    return Math.floor(Math.random() * max);
  }

  function newGame() {
    const randomNumbers = [
      random(maxNumber + 1)
    ];
    randomNumbers[1] = Math.min(randomNumbers[0] + random(20), 100);

    if(random(2)) {
      [randomNumbers[0], randomNumbers[1]] = [randomNumbers[1], randomNumbers[0]];
    }

    setGame({
      randomNumbers: randomNumbers,
    });
  }

  function checkAnswer(answer) {
    if(answer === 0 && game.randomNumbers[0] > game.randomNumbers[1] ||
      answer === 1 && game.randomNumbers[0] < game.randomNumbers[1] ||
      answer === 2 && game.randomNumbers[0] === game.randomNumbers[1]
    ) {
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
    <div className="PorownywanieLiczb">
      <Voice text={taskCommand}/>
      <div className="task">
        {game.randomNumbers[0]}
        <div className="gap"/>
        {game.randomNumbers[1]}
      </div>
      <div className="answers">
        <div onClick={() => checkAnswer(0)}>&gt;</div>
        <div onClick={() => checkAnswer(1)}>&lt;</div>
        <div onClick={() => checkAnswer(2)}>=</div>
      </div>
    </div>
  );
}

PorownywanieLiczb.propTypes = {
  onCorrectAnswer: PropTypes.function,
  onIncorrectAnswer: PropTypes.function
};

export default PorownywanieLiczb;
