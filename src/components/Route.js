import React, {useState} from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import ClassSelection from '../screens/ClassSelection';
import Initial from '../screens/Initial';
import SectionSelection from '../screens/SectionSelection';
import Section from '../screens/Section';

function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    document.body.className = 'route' + location.pathname.replace('/', '-');
  }, [location]);
}

function Router() {
  usePageViews();

  const [timer, setTimer] = useState(0);

  function onSecondPassed() {
    setTimer(timer + 1);
  }

  return (
    <Switch >
      <Route path="/classes">
        <ClassSelection/>
      </Route>
      <Route path="/sections/:classNumber">
        <SectionSelection/>
      </Route>
      <Route path="/game/:classNumber/:gameIndex">
        <Section timer={timer} onSecondPassed={onSecondPassed} />
      </Route>
      <Route path="/">
        <Initial/>
      </Route>
    </Switch>
  );
}

export default Router;
