import React from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import ClassSelection from '../screens/ClassSelection';
import Initial from '../screens/Initial';
import SectionSelection from '../screens/SectionSelection';

function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    document.body.className = 'route' + location.pathname.replace('/', '-');
  }, [location]);
}

function Router() {
  usePageViews();
  return (
    <Switch >
      <Route path="/class">
        <ClassSelection/>
      </Route>
      <Route path="/section">
        <SectionSelection/>
      </Route>
      <Route path="/">
        <Initial/>
      </Route>
    </Switch>
  );
}

export default Router;
