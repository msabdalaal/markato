import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAddUser } from "../hooks/users"
import { User } from "../types"
import { emailAlert, EmailRegex, passwordAlert, passwordRegex, userNameAlert, userNameRegex } from "../Regex"

export default function Signup() {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { addEntity: addUser, error } = useAddUser();
  const [message, setMessage] = useState("")
  const validateForm = () => {
    if (!email.match(EmailRegex)) {
      emailAlert()
      return false
    } else if (!password.match(passwordRegex)) {
      passwordAlert()
      return false
    } else if (!userName.match(userNameRegex)) {
      userNameAlert()
    } else return true
  }
  const handleSignup = async () => {
    setMessage("")
    if (validateForm()) {
      const user: User = {
        name: userName,
        email: email,
        password: password,
        address: "",
        isActive: true,
        isAdmin: false,
        phone: ""
      }
      const response = await addUser(user)
      if (response) {
        setMessage(JSON.stringify(response))
      }

    }

  }

  return (
    <section className="bg-gray-100 flex items-center justify-center min-h-screen">

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Create an Account</h2>
        {/* <!-- Name Input --> */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} id="name" placeholder="Your Name" className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

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

        {/* <!-- Sign Up Button --> */}
        <button onClick={() => handleSignup()} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          Sign Up
        </button>
        {message && <p className="text-center">{message}</p>}
        {/* <!-- Already have an account --> */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account? <Link to="/Login" className="text-blue-500 hover:text-blue-700 font-bold">Log in</Link>
        </p>
      </div>

    </section>
  )
}
