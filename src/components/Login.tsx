import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { setCookie } from 'cookies-next';
import { ComponentProps } from 'lib/component-props';
import { useState } from 'react';

declare global {
  interface Window { mootrack:any; }
}

type LoginProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Login = (): JSX.Element => {
  const [useName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const loginClicked = () => {
    if (useName === 'admin' && password === 'admin') {      
      const loginData = { userName: useName, isLoggedIn: true, token: '' };
      localStorage.setItem('userData', JSON.stringify(loginData));            
    } else if(useName.length !==0 && password.length !== 0) {
      const loginData = { userName: useName, isLoggedIn: true, token: '' };
      localStorage.setItem('userData', JSON.stringify(loginData));   
    }
    else {
      alert("Invalid username/pass");
      return;
    }
    if (typeof window !== "undefined") {
      window.mootrack('identify',useName);
    }
    setCookie("authCookie", useName)
    window.location.href = "/";
  };
  return (
    <>
      <div className="container">
        <label><b>Username</b></label>
        <input className='text' type="text" placeholder="Enter Username" name="uname" required onChange={(e) => setUserName(e.target.value)}/>

        <label><b>Password</b></label>
        <input className='password' type="password" placeholder="Enter Password" name="psw" required onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit" onClick={() => loginClicked()}>Login</button>
      </div>
    </>
  );
};

export default withDatasourceCheck()<LoginProps>(Login);
