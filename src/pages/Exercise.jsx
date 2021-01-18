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

import Container from '@material-ui/core/Container';


function buildExercise (props) {


    return (
        <AuthUserContext.Consumer>
               {
        authUser => authUser ? (
            <div>
                <CssBaseline />
                <Toolbar >
          
                    <Typography component="h1" variant="h6" color="inherit" noWrap >
                    Dashboard
                    </Typography>
         
                </Toolbar>

         

                <div />
                <Container maxWidth="xl" >
               <h1>derp</h1>
                </Container>
                
            </div>
            ) : (
            <p>Not authorized.</p>
         )
      }
        </AuthUserContext.Consumer>
        )
    }
    
export default withRouter(withAuthentication(buildExercise));