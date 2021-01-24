import React from 'react';
import { useParams } from 'react-router-dom';
import award from '../assets/images/trophy.svg';
import games from '../components/GamesState';
import './Diploma.scss';
import a from '../assets/images/coloring/1.gif';
import b from '../assets/images/coloring/2.jpeg';
import c from '../assets/images/coloring/3.gif';
import d from '../assets/images/coloring/4.jpg';

function Diploma() {
  const { classNumber } = useParams();
  let awardsSum = 0;
  const coloring = [a, b, c, d];
  const randomColoring = coloring[Math.floor(Math.random() * coloring.length)];

  for(let i = 0; i < games.state[classNumber].length; ++i) {
    awardsSum += games.getAwards(games.state[classNumber][i].correct);
  }

  window.print();

  return (
    <div className="Diploma">
      <h1>Dyplom</h1>
      <h3>za osiągnięcia w nauce matematyki</h3>
      <h3>otrzymuje</h3>
      <h2>{localStorage.getItem('name')}</h2>
      <h3>Klasa {classNumber}</h3>
      <h2>
        <img className="award" src={award} alt="Puchar"/>
        {awardsSum}
      </h2>
      <h4>Kolorowanka w prezencie</h4>
      <img className="coloring" src={randomColoring} alt="Kolorowanka"/>
    </div>
  );
}

export default Diploma;
