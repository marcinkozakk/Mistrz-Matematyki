import React from 'react';
import {Link} from 'react-router-dom';
import './ClassSelection.scss';

function ClassSelection() {
  return (
    <div className="ClassSelection">
      <h1>Mistrz Matematyki</h1>
      <div className="linksContainer">
        <Link to="/section">Klasa 1</Link>
        <Link to="/section">Klasa 2</Link>
      </div>
    </div>
  );
}

export default ClassSelection;
