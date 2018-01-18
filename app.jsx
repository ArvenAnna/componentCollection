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
import Indicators from './indicators';
import Tooltips from './tooltips';
import Dialogs from './dialogs';
import Cards from './cards';
import Notifications from './notifications';
import Tables from './table';
import MainPage from './MainPage';

import {ThemeProvider} from "styled-components";
import * as theme from './theme';


ReactDOM.render(
    <ThemeProvider theme={theme}>
      <HashRouter>
          <div className="root">
              <div className="main_menu">
                  <NavLink to="/switch">Switch</NavLink>
                  <NavLink to="/tabs">Tabs</NavLink>
                  <NavLink to="/textfields">TextFields</NavLink>
                  <NavLink to="/buttons">Buttons</NavLink>
                  <NavLink to="/indicators">Indicators</NavLink>
                  <NavLink to="/tooltips">Tooltips</NavLink>
                  <NavLink to="/dialogs">Dialogs</NavLink>
                  <NavLink to="/cards">Cards</NavLink>
                  <NavLink to="/notifications">Notifications</NavLink>
                  <NavLink to="/tables">Tables</NavLink>
              </div>
              <div className="content">
                  <Switch>
                      <Route exact path='/' component={MainPage}/>
                      <Route path='/switch' component={Switchers}/>
                      <Route path='/tabs' component={Tabs}/>
                      <Route path='/textfields' component={TextFields}/>
                      <Route path='/buttons' component={Buttons}/>
                      <Route path='/indicators' component={Indicators}/>
                      <Route path='/tooltips' component={Tooltips}/>
                      <Route path='/dialogs' component={Dialogs}/>
                      <Route path='/cards' component={Cards}/>
                      <Route path='/notifications' component={Notifications}/>
                      <Route path='/tables' component={Tables}/>

                  </Switch>
              </div>
          </div>
      </HashRouter>
    </ThemeProvider>,
  document.getElementById('mount')
)