import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){ 
    firebase.initializeApp(firebaseConfig);
    }
}

// GOOGLE LOGIN

export const handleGoogleSignIn = ()=>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(googleProvider)
  .then(res => {
    const {displayName,photoURL,email} = res.user;
    const signedInUser = {
      isSignedIn: true,
      name: displayName,
      email:email,
      photo:photoURL,
      success:true
    }
    return signedInUser;
    // console.log(displayName,email,photoURL);
  })
  .catch(err => {
    console.log(err);
    console.log(err.message);
  })
}

// FACEBOOK LOGIN

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
  
    return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
      // The signed-in user info.
      var user = result.user;
      user.success = true;
      return user;
      // console.log('fb user after sign in', user);
  
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;
  
      // ...
    })
    .catch((error) => {
      // // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // console.log(errorCode,errorMessage);
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
  
      // // ...
  
      console.log(error);
    });
   }



   export const handleSignOut = () => {
   return firebase.auth().signOut()
    .then(res=> {
      const signedOutUser ={
        isSignedIn: false,
        name: '',
        photo: '',
        email: ''
      }
      return signedOutUser;
    })
    .catch(err => {
     // console.log(err);
     // console.log(err.message);
   })
   //  console.log("sign out clicked");
  }



  export const createUserWithEmailAndPassword = (name,email,password) => {
   return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success= true;
      updateUserName(name);
      return newUserInfo;

    })
    .catch(error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      

      // var errorCode = error.code;
      // var errorMessage = error.message;
      // console.log(errorCode,errorMessage);
    });
  }



  export const signInWithEmailAndPassword = (email, password) => {
   return  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      
      const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success= true;
        return newUserInfo;
        
        // console.log('sign in user info', res.user);      
  
    })
  
    .catch((error) => {
      const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
  
    });
  }

  const updateUserName =name =>{
    const user = firebase.auth().currentUser;
  
    user.updateProfile({
      displayName: name,
    })
    .then(() => {
      // Update successful
    console.log('user name update succesfully');
      // ...
    })
    .catch((error) => {
      // An error occurred
      console.log(error);
      // ...
  });  
  }