import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,  signInWithRedirect } from "firebase/auth";
import { auth } from "../../firebase"
import "./login.css"
import { AuthContext } from "../../context/AuthContext"
import Logo from '../../compenents/img/-ClassNetLogo.svg';


const Login = () => {

  const [error, setError] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext)

  const SignInNavigate = () => {
    navigate("/signin")
  }


  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.clear();
        // Signed in 
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user })
        navigate("/")
        const userId = user.uid;
        const userName = user.displayName;
        const userEmail = user.email;
        localStorage.setItem('userName', userName)
        localStorage.setItem('userEmail', userEmail)
        localStorage.setItem('userId', userId);
      })
      .catch((error) => {
        setError(true)
      });
  }

  const GoogleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, GoogleProvider).then((GoogleUser) => {
      localStorage.clear();
      dispatch({ type: "LOGIN", payload: GoogleUser })
      navigate("/")
      const name = GoogleUser.user.displayName;
      const email = GoogleUser.user.email;
      const userId = GoogleUser.user.uid;
      const pic = GoogleUser.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem('userId', userId);
      localStorage.setItem("pic", pic);
      localStorage.setItem("userName", name);
    }).catch((error) => {
      setError(true);
      console.error("Google sign-In Error" ,error);
      const ggerror = error;
      var elemDiv = document.createElement('div');
      elemDiv.innerHTML = ggerror;
      elemDiv.style.cssText = 'position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:#000;';
      document.body.appendChild(elemDiv);
    })
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <img src={Logo}></img>
        <input type="email" placeholder="Your Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Your Password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Log In</button>
        <p className="signin-msg">You don't have a Class Net accont : <a className="signin-link" onClick={SignInNavigate}>Sign-In here for free</a></p>
        {error && <span>Wrong email or password!</span>}
      </form>
      <button className="Google-btn" onClick={signInWithGoogle}>
        <i>
          <svg width="20" height="20" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m22.18 10.382-.107-.45h-9.77v4.136h5.838c-.606 2.878-3.419 4.393-5.716 4.393-1.672 0-3.434-.703-4.6-1.833a6.566 6.566 0 0 1-1.96-4.636c0-1.741.783-3.484 1.922-4.63 1.14-1.146 2.86-1.787 4.57-1.787 1.96 0 3.363 1.04 3.888 1.514l2.939-2.923c-.862-.757-3.23-2.666-6.922-2.666-2.847 0-5.578 1.09-7.574 3.08C2.718 6.54 1.7 9.372 1.7 12s.965 5.32 2.874 7.294C6.613 21.399 9.5 22.5 12.475 22.5c2.706 0 5.27-1.06 7.1-2.984 1.796-1.894 2.726-4.514 2.726-7.261 0-1.156-.116-1.843-.122-1.873Z"></path>
          </svg>
        </i>
      LogIn whit Google</button>
    </div>
  )
}

export default Login