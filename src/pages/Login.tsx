import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../providers/AuthContext";
import useAuth from "../hooks/useAuth";
import { ring } from "ldrs";
ring.register();
export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { authenticate, error } = useAuth();
  const { auth, loading } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogin = () => {
    authenticate({ email: email ?? "", password: password ?? "" });
  };
  useEffect(() => {
    setEmail("");
    setPassword("");
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);
  return (
    <section className="bg-gray-100 flex items-center justify-center min-h-screen">

      {loading ? <l-ring size="60" color="#000" />
        : <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Welcome Back</h2>

          {/* <!-- Email Input --> */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Your Email" className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* <!-- Password Input --> */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Your Password" className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* <!-- Login Button --> */}
          <button onClick={() => handleLogin()} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            Log In
          </button>

          {/* <!-- Don't have an account? --> */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account? <Link to={"/Signup"} className="text-blue-500 hover:text-blue-700 font-bold">Sign Up</Link>
          </p>
        </div>}

    </section>
  )
}
