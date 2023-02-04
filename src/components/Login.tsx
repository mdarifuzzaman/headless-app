import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { setCookie } from 'cookies-next';
import { ComponentProps } from 'lib/component-props';
import Router from 'next/router';
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
    Router.push('/');
  };
  return (
    <article>      
      <div>
        <input
          type="text"
          placeholder="UserName"
          onChange={(e) => setUserName(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div>
        <button onClick={() => loginClicked()}>Login</button>
      </div>
    </article>
  );
};

export default withDatasourceCheck()<LoginProps>(Login);
