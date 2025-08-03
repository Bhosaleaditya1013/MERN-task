import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';


function Login({ setLoggedInUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    const validUsername = "admin";
    const validPassword = "123456";

    if (username === validUsername && password === validPassword) {
      setLoggedInUser({ username });
      navigate("/dashboard");
    } else {
      setErrorMsg("Login failed. Invalid credentials.");
    }
  };

  return (
    <div className="login-container">
    <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      </form>
    </div>
  );
}

export default Login;
