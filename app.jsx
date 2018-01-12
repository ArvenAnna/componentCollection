import React from 'react'
import ReactDOM from 'react-dom';

import {HashRouter} from 'react-router-dom';
import './_variables.less';

import './main.less';

import NavLink from "react-router-dom/es/NavLink";
import {Route, Switch} from "react-router-dom";
import SwitchControl from "./switch/SwitchControl";


ReactDOM.render(
      <HashRouter>
          <div className="root">
              <div className="menu">
                  <NavLink to="/switch">Switch</NavLink>
              </div>
              <div className="content">
                  {/*<Switch>*/}
                      {/*/!*<Route exact path='/' component={AlbumContainer}/>*!/*/}
                      {/*<Route path='/switch' component={<SwitchControl isSwitch/>}/>*/}
                  {/*</Switch>*/}
                  <div><SwitchControl>some option</SwitchControl></div>
              </div>
          </div>
      </HashRouter>,
  document.getElementById('mount')
)