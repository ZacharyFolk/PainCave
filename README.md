# Pain Cave

 * A learning project and also a way to track my exercises
 * Based off of [this tutorial](https://dev.to/sanderdebr/let-s-build-workout-tracker-with-react-and-firebase-part-1-1hng) 
  
# Todos 
* Add graphic
* More Arnold
* Create Exercise Groups
* Groups => Output of select input
* Example : Weights Group reveals sets, reps, and weight slider 
* Example : Cardio Group reveal duration and distance sliders
* Example : Body Group reveals sets and reps
* 🏋️ Exercise should be able to have an emoji attached 🚴 
* Start timer for workout
 
### User Story
* User must be able to create an exercise
* Exercise can be part of a group of types : cardio, weight, body
* Exercise can be part of a muscle group
* Exercise can have default weight set
* Exercise can have default reps set
* Exercise can have default duration set
* Exercise should check if name exists and reject duplicates

  
> Flow 
* Have a button to Start Workout
* Press Start Workout shows button to create Exercise and list of existing exercises
* Exercise Type should able to be filtered by groups and types
* You can add as many exercise as you want
* Push Start Workout and timer starts
* Each exercise should be able to be started with each rep checked as completed
* Each rep should have a 1:00 cooldown time
* Click Complete Workout to Stop timer and bring save prompt
* Click save Workout prompt to have it stored 
* User should be able to go to archives page
* Archives should have a calendar with all days with a workout highlighted and able to be clicked
* Clicking highlight calendar day shows the exercises from that workout

> Resources
* https://console.firebase.google.com/project/workout-tracker-ceb51/database/workout-tracker-ceb51-default-rtdb/data
* https://material-ui-pickers.dev/getting-started/installation
* https://date-fns.org/ or https://momentjs.com/ ? 
* https://material-ui.com/
* http://jquense.github.io/react-big-calendar/examples/index.html#basic ,#rendering
* https://stackoverflow.com/a/46428629/82330 => Finally helped me understand how to pass function reference from parent to pass value from child->parent
* https://codesandbox.io/
* https://gazielle.itch.io/pixel-caves
* https://material-ui.com/customization/theming/#theme-provider
* https://www.robinwieruch.de/react-usestate-hook
* https://www.youtube.com/watch?app=desktop&v=LJ5OY_rfrvU&ab_channel=PXLFLX
* https://vertibirdo.tumblr.com/image/162349425593
* https://www.patreon.com/posts/fire-tutorial-7293859
* https://www.patreon.com/posts/rock-formations-9856719
* https://www.pinterest.com/pin/361836151311168309/
* https://www.pinterest.com/pin/347058715029947262/


> Visual Studio
> CTRL + SHIFT + P => settings => Preferences : Open user settings
> "format on save"

> => settings => terminal.integrated.shell.windows
>             => brower-preview.startUrl 

