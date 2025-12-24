import { useNavigate } from "react-router-dom";
import './Login.css';
import { supabase } from "./lib/supabase";
import { useState } from "react";

type LoginProps = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({ setLoggedIn }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // const { error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });

    // if (error) {
    //   alert(error.message);
    // } else {
    //   setLoggedIn(true);
    //   navigate("/dashbord"); 
    // }
 
 setLoggedIn(true);
    navigate("/dashbord");  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) {
      alert(error.message);
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
        <input type="email" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
      </div>

      <div className="input-box">
        <i className="fa-solid fa-lock"></i>
        <input type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
      </div>

      <button type="submit">Login</button>
    </form>

    <button type="button" onClick={handleGoogleLogin}>Login with Google</button>
  </div>
</div>

   
  );
}
