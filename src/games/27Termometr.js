import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './27Termometr.scss';
import temp0 from '../assets/images/temperature/0.PNG';
import temp5 from '../assets/images/temperature/5.PNG';
import temp10 from '../assets/images/temperature/10.PNG';
import temp12 from '../assets/images/temperature/12.PNG';
import temp4 from '../assets/images/temperature/-4.PNG';
import temp6 from '../assets/images/temperature/-6.PNG';
import temp7 from '../assets/images/temperature/-7.PNG';
import temp11 from '../assets/images/temperature/-11.PNG';
import temp13 from '../assets/images/temperature/-13.PNG';
import temp14 from '../assets/images/temperature/-14.PNG';
import Voice from '../components/Voice';

function Termometr(prop) {
  const taskCommand = 'Ile stopni pokazuje termometr?';

  const images = [temp0, temp5, temp10, temp12, temp4, temp6, temp7, temp11, temp13, temp14];

  const temperatures = [
    0,
    5,
    10,
    12,
    -4,
    -6,
    -7,
    -11,
    -13,
    -14,
  ];

  const [game, setGame] = useState({
    correctTemperature: 0,
    image: 0,
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
    const randomIndex = random(temperatures.length);
    const correctTemperature = temperatures[randomIndex];
    setGame({
      correctTemperature: correctTemperature,
      image: randomIndex,
      answers: shuffle([correctTemperature-1, correctTemperature, correctTemperature+1])
    });
  }

  function checkAnswer(answer) {
    if (answer === game.correctTemperature) {
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
    <div className="Termometr">
      <Voice text={taskCommand}/>
      <div className="image">
        <img src={images[game.image]} alt="Termometr"/>
      </div>
      <div className="answers">
        {game.answers.map((e, i) =>
          <div onClick={() => checkAnswer(e)} key={i}>{e}</div>
        )}
      </div>
    </div>
  );
}


Termometr.propTypes = {
  onCorrectAnswer: PropTypes.function,
  onIncorrectAnswer: PropTypes.function
};

export default Termometr;
