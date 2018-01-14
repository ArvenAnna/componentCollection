import React from 'react'
import ReactDOM from 'react-dom';

import {HashRouter} from 'react-router-dom';
import './_variables.less';

import './main.less';

import NavLink from "react-router-dom/es/NavLink";
import {Route, Switch} from "react-router-dom";
import Switchers from "./switch";
import Tabs from "./tabs";
import TextFields from './textFields';
import Buttons from './buttons';

import {ThemeProvider} from "styled-components";
import * as theme from './theme';


ReactDOM.render(
    <ThemeProvider theme={theme}>
      <HashRouter>
          <div className="root">
              <div className="menu">
                  <NavLink to="/switch">Switch</NavLink>
                  <NavLink to="/tabs">Tabs</NavLink>
                  <NavLink to="/textfields">TextFields</NavLink>
                  <NavLink to="/buttons">Buttons</NavLink>

              </div>
              <div className="content">
                  <Switch>
                      {/*<Route exact path='/' component={AlbumContainer}/>*/}
                      <Route path='/switch' component={Switchers}/>
                      <Route path='/tabs' component={Tabs}/>
                      <Route path='/textfields' component={TextFields}/>
                      <Route path='/buttons' component={Buttons}/>

                  </Switch>
              </div>
          </div>
      </HashRouter>
    </ThemeProvider>,
  document.getElementById('mount')
)