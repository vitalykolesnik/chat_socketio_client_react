import { useRef } from "react";
import { Link } from "react-router-dom";
import { useToken } from "hooks/useToken";

const Login = () => {
  const { handleLogin } = useToken();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({
      user: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    });
  };

  return (
    <div className="loginFormContainer">
      <div className="loginFormWrapper">
        <span className="logo">My Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            ref={emailRef}
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            ref={passwordRef}
            placeholder="password"
          />
          <button type="submit">Sign in</button>
        </form>
        <p>
          You don't have an account?{" "}
          <Link className="link" to="/signup">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
