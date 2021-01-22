import React from 'react';

import { AuthUserContext, withAuthentication } from '../components/Session';
import { withRouter } from 'react-router-dom';

import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Header from '../components/Header'
import Container from '@material-ui/core/Container';
import Exercise from '../components/Exercise'
import AddExercise from '../components/AddExercise'
function buildExercise (props) {
    return (
        <AuthUserContext.Consumer>
               {
        authUser => authUser ? (
            <div>
                <CssBaseline />
                <Header />
                <Exercise
                firebase={props.firebase}
                authUser={authUser}
                />
            </div>
            ) : (
            <p>Not authorized.</p>
         )
      }
        </AuthUserContext.Consumer>
        )
    }
    
export default withRouter(withAuthentication(buildExercise));