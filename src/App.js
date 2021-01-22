import React from 'react'
import Home from './containers/Frontpage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { RecoilRoot, } from 'recoil'


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
