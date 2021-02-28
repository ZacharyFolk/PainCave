import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import FirebaseConfig from '../../private/firebase/keys';

class Firebase {
    constructor() {
        app.initializeApp(FirebaseConfig);
        this.auth = app.auth();
        this.db = app.database();
    }
    
    /*** Authentication  ***/
    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => 
        this.auth.signOut();

    doPasswordReset = email => 
        this.auth.sendPasswordResetEmail(email);
    
    /*** Database ***/
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');


    addActivity = (uid, activity) => {
        const ref = this.db.ref().child(`users/${uid}/activities`);
        ref.push(activity);
    };

    updateActivity = (uid, activity, activityKey) => {
        const ref = this.db.ref().child(`users/${uid}/activities/${activityKey}`);
        ref.update(activity);
    }

    addExercise = (uid, exercise) => {
        // todo : prevent duplicate by name
        const ref = this.db.ref().child(`users/${uid}/exercises/groups/${exercise.group}/`);
        ref.push(exercise.title);
    };

    addWorkout = (uid, workout) => {
        const ref = this.db.ref().child(`users/${uid}/workouts/`);
        ref.push(workout);
        // console.log('FROM FIREBASE.js workout object')
        // console.log(workout);
    } 

    fetchExercise = (uid, type) => {
        const ref = this.db.ref()
        .child(`users/${uid}/exercises/groups/${type}/`);
      var exerciseArray= [];
  
      ref.on("value", (snapshot) => {
        if (snapshot && snapshot.exists()) {
          snapshot.forEach((data) => {
            const dataVal = data.val();
   
            exerciseArray.push(dataVal)
             
          });
 
        }
      });
      console.log('(exerciseArray) from firebase :');
      console.log(exerciseArray);
      exerciseArray.forEach(element => console.log(element));

      return(exerciseArray);
    }

}

export default Firebase;