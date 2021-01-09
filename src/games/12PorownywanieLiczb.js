import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './12PorownywanieLiczb.scss';
import Voice from '../components/Voice';

function PorownywanieLiczb(prop) {
  const maxNumber = 20;
  const taskCommands = [
    'Która liczba jest większa?',
    'Która liczba jest mniejsza?'
  ];

  const [game, setGame] = useState({
    taskCommand: 0,
    randomNumbers: [0, 0],
  });

  function random(max) {
    return Math.floor(Math.random() * max);
  }

  function newGame() {
    const randomNumbers = [
      random(maxNumber) + 1
    ];
    randomNumbers[1] = (randomNumbers[0] + random(maxNumber - 1) + 1) % 20;

    setGame({
      randomNumbers: randomNumbers,
      taskCommand: random(2)
    });
  }

  function checkAnswer(answer) {
    if(
      (game.taskCommand === 0 && answer >= game.randomNumbers[0]) ||
      (game.taskCommand === 1 && answer <= game.randomNumbers[0])
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
      <Voice text={taskCommands[game.taskCommand]}/>
      <div className="answers">
        {game.randomNumbers.map((e, i) =>
          <div onClick={() => checkAnswer(e)} key={i}>{e}</div>
        )}
      </div>
    </div>
  );
}

PorownywanieLiczb.propTypes = {
  onCorrectAnswer: PropTypes.function,
  onIncorrectAnswer: PropTypes.function
};

export default PorownywanieLiczb;
