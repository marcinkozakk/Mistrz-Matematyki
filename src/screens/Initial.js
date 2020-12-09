import React from 'react';
import './Initial.scss';
import {Link} from 'react-router-dom';

function Initial() {
  return (
    <div className="Initial">
      <h1>Mistrz Matematyki</h1>
      <Link to="/classes">Rozpocznij</Link>
    </div>
  );
}

export default Initial;
