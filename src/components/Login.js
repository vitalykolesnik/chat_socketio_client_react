import { useRef } from 'react';
import s from 'components/Login.module.css';

export const Login = ({ onSubmit }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      user: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    });
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit}>
        <h2>Welcome to chat</h2>
        <div>
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="text" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} type="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
