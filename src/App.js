import React from 'react';
import './App.css';
import Home from './pages/Frontpage'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


function App() {
  return (
    <RecoilRoot>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </RecoilRoot>
  );
}

export default App;
