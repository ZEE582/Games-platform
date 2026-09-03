import { useNavigate  } from "react-router-dom";
import './Login.css';
import { auth } from "./lib/firebase";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

type LoginProps = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({ setLoggedIn }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    await fetch("https://694b5c9e26e870772067e469.mockapi.io/po/users",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        "Email":email,
        "Password":password
      })
    }).then((response)=>response.json())
    setLoggedIn(true);
   navigate("/dashbord");
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setLoggedIn(true);
      navigate("/dashbord");
    } catch (error) {
      alert("Failed to login with Google");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        
    <h2>Welcome Back 🎮</h2>
    <p>Login to access the gaming platform</p>

    <form onSubmit={handleLogin}>
      <div className="input-box">
        <i className="fa-solid fa-envelope"></i>
        <input type="email" placeholder="Email" required value={email} onChange={(event)=>setEmail(event.target.value)} />
      </div>

      <div className="input-box">
        <i className="fa-solid fa-lock"></i>
        <input type="password" placeholder="Password" required value={password} onChange={(event)=>setPassword(event.target.value)} />
      </div>

      <button type="submit">Login</button>
    </form>

    <button type="button" onClick={handleGoogleLogin}>Login with Google</button>
  </div>
</div>

   
  );
}
