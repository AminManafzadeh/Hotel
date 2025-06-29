import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Context/useAuth";

function Login() {
  const [email, setEmail] = useState("amin.mah1375@gmail.com");
  const [password, setPassword] = useState("123456");
  const { login, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) await login(email, password);
  };
  console.log(user);

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
          />
        </div>

        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </div>

        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
