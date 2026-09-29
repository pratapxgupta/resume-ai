import { useState } from "react";
import {useNavigate, Link} from "react-router"
import { useAuth } from "../hooks/useAuth";

const Register = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const {loading, handleRegister}= useAuth()
  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrorMessage("")

    try {
      await handleRegister({username, email,password})
      navigate("/")
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Unable to register. Please try again.",
      )
    }
  };

if(loading){
return (
<main><h1>Loading</h1></main>
)
}

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {errorMessage && <p role="alert">{errorMessage}</p>}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              id="username"
              name="username"
              placeholder="Enter username"
              required
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              required
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button className="button primary-button" type="submit" disabled={loading}>
            Register
          </button>
        </form>
        <p>Alreay have an account ? <Link to={"/login"}>Login</Link></p>
      </div>
    </main>
  );
};
export default Register;
