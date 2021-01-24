import React from 'react';
import { AuthUserContext, withAuthentication } from '../components/Session';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../components/Header'
import Exercise from '../components/Exercise'
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