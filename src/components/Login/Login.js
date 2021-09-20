
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';


function Login() {

  const [newUser, setNewUser] = useState(false);

  const [user,setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success:false
  })

  initializeLoginFramework();

 const [loggedInUser, setLoggedInUser] = useContext(UserContext);
 const history = useHistory();
 const location = useLocation();
 let { from } = location.state || { from: { pathname: "/" } };



// ............42 module er kaj..........

const googleSignIn = () => {
  handleGoogleSignIn()
  .then(res => {
    handleResponse(res, true);
  })
}

const fbSignIn = () => {
  handleFbSignIn()
  .then(res => {
    handleResponse(res, true);
  })
}


 const signOut = () => {
  handleSignOut()
  .then(res => {
    handleResponse(res, false);
    
  })
}


const handleResponse = (res, redirect) => {
  setUser(res);
  setLoggedInUser(res);
  if(redirect){
    history.replace(from);
  }
}



 const handleBlur=(e) => {
  
  //  console.log(e.target.name,e.target.value);

  let isFieldValid = true;

  // Email Validatation
  
   if (e.target.name === 'email') {
    //  akhane email thik moto boshano hoice kina seta cheack kora hocce
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      // console.log(isEmailValid);
     
   }
    if (e.target.name === 'password') {
  // aikhane password 6 digit er beshi and number use kora hoice kina seta check kora hocce..
    const isPasswordValid = e.target.value.length > 6;
    const passwordHasNumber = /\d{1}/.test(e.target.value);
    isFieldValid = isPasswordValid && passwordHasNumber;
    
     
   }
    if (isFieldValid) {
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
    }
 }



 const handleSubmit = (e) => {
  //  console.log(user.email, user.password);
   if (newUser && user.email && user.password) {
     createUserWithEmailAndPassword(user.name,user.email,user.password)
     .then(res => {
      handleResponse(res, true);
     })
     

    
    
  }
  if (!newUser && user.email && user.password) {

     signInWithEmailAndPassword(user.email,user.password)
     .then(res => {
      handleResponse(res, true);
   })
    
  }


   e.preventDefault();
 }




  return (


    <div style={{textAlign:'center'}} >

      {
        user.isSignedIn ?  <button onClick={signOut}>sign out</button> :
        <button onClick={googleSignIn}>sign in</button>
      }
    <br /> 
      <button onClick={fbSignIn}>Sign in using Facebook</button>

      {/* {
        user.isSignedIn && <div>
        <p> welcome, {user.name} </p> 
        <p>Your Email: {user.email}</p>
        <img src={user.photo} alt="" />


        </div>
      } */}
{/* 42 module er kaj  */}

{/* aita email and password er jonno form make kora hoice */}
      <h1>Our Own Authentication</h1>
      {/* <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}
      <input type="checkbox" onChange={()=> setNewUser(!newUser)}  name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>
      
      <form onSubmit={handleSubmit}>
        { newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Enter Your name" required></input>}
        <br />
        <input type="text" onBlur={handleBlur} name="email" placeholder="Enter Your Email" required></input>
        <br />
        <input type="password" onBlur={handleBlur} placeholder="Enter Your Password" name="password" id="" required></input>
        <br />
        <input type="submit" value= {newUser ? 'Sign Up' : 'Sign In'}></input>
     </form>

     <p style={{color: 'red'}}>{user.error}</p>
     {
       user.success && <p style={{color: 'green'}}>user {newUser ? 'created' :'Logged In' } successfully</p>
     }

    </div>
  );
}

export default Login;
