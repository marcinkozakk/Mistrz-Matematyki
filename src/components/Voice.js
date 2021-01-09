import React from 'react';
import PropTypes from 'prop-types';
import unidecode from 'unidecode';
import './Voice.scss';
import speaker from '../assets/images/loud-speaker.svg';
import v11 from '../assets/voice/11.mp3';
import v12a from '../assets/voice/12a.mp3';
import v12b from '../assets/voice/12b.mp3';
import v13 from '../assets/voice/13.mp3';
import v14 from '../assets/voice/14.mp3';
import v15 from '../assets/voice/15.mp3';
import v16a from '../assets/voice/16a.mp3';
import v16b from '../assets/voice/16b.mp3';
import v16c from '../assets/voice/16c.mp3';
import v16d from '../assets/voice/16d.mp3';
import v16e from '../assets/voice/16e.mp3';
import v17a from '../assets/voice/17a.mp3';
import v17b from '../assets/voice/17b.mp3';
import v17c from '../assets/voice/17c.mp3';
import v17d from '../assets/voice/17d.mp3';
import v21 from '../assets/voice/21.mp3';
import v26 from '../assets/voice/26.mp3';
import v27 from '../assets/voice/27.mp3';

function Voice(props) {
  const voice = {
    'Ile widzisz przedmiotow?': v11,
    'Ktora liczba jest wieksza?': v12a,
    'Ktora liczba jest mniejsza?': v12b,
    'Wskaz rozwiazanie dzialania': v13,
    'Ile tu jest pieniedzy?': v14,
    'Co wpisac w luke, aby dzialanie bylo prawidlowe?': v15,
    'Jak nazywa sie ta figura?': v16a,
    'Wskaz prostokat': v16b,
    'Wskaz kolo': v16c,
    'Wskaz trojkat': v16d,
    'Wskaz szesciokat': v16e,
    'Ktora pora roku jest przed wiosna?': v17a,
    'Ktora pora roku jest przed latem?': v17b,
    'Ktora pora roku jest przed jesienia?': v17c,
    'Ktora pora roku jest przed zima?': v17d,
    'Wstaw odpowiedni znak w luke': v21,
    'Co to za liczba rzymska?': v26,
    'Ile stopni pokazuje termometr?': v27
  };

  function play() {
    var audio = new Audio(voice[unidecode(props.text)]);
    audio.play();
  }

  return (
    <h2 className="Voice">{props.text}<img onClick={play} src={speaker} alt="głosnik"/></h2>
  );
}

Voice.propTypes = {
  text: PropTypes.string
};

export default Voice;
