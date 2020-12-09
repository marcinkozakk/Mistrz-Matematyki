import React from 'react';
import {Link} from 'react-router-dom';
import './ClassSelection.scss';

function ClassSelection() {
  return (
    <div className="ClassSelection">
      <h1>Mistrz Matematyki</h1>
      <div className="linksContainer">
        <Link to="/sections/1">Klasa 1</Link>
        <Link to="/sections/2">Klasa 2</Link>
      </div>
    </div>
  );
}

export default ClassSelection;
