import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './LoginForm.module.css';

function LoginForm(props) {
  const emailInputRef = useRef();
  const passInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;

    const loginData = {
      email: enteredEmail,
      pass: enteredPass,
    };

    props.onLogin(loginData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>E-mail</label>
          <input type='email' required id='email' ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='pass'>Password</label>
          <input type='password' required id='pass' ref={passInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Login</button>
        </div>
      </form>
    </Card>
  );
}

export default LoginForm;
