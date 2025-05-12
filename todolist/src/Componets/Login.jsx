import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import './Login.css'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center background font-serif">
    
      <div className="bg-white dark:bg-gray-700 shadow-2xl shadow-gray-800 p-10 rounded-xl w-96 ">
        
        <h2 className="text-3xl font-serif  font-semibold mb-3 text-center text-gray-800 dark:text-white">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        
        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <input type="email" className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <br />
          <input type="password" className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl  hover:bg-blue-700 ">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-700 dark:text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button className="text-blue-300 font-serif hover:underline cursor-pointer " onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
        
      </div>

    </div>
  );
}
