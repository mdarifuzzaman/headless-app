import { deleteCookie, getCookie } from 'cookies-next';
import Router from 'next/router';
import { useEffect, useState } from "react";

const Navigation = (): JSX.Element => {
  const [auth, setAuth] = useState("");
  useEffect(() => {
    const authCookie = getCookie("authCookie");
    console.log("Found auth cookie:", authCookie);
    setAuth(authCookie?.toString()!);
  }, []);

  const logout = () => {
    deleteCookie("authCookie");
    setAuth("");
    Router.push('/login');
  }
  return (
    <>
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/job-listing">Jobs</a>
          <a href="/register">Register</a>
          <a href="/contact">Contact</a>         
          <a className='alert-light text-success'
            data-mooform-id="0114b6ee-d4f4-4bcf-8db8-cd174710469c"
            href="https://mdar.m-pages.com/e6sCrN/anotherform"
          >
            Subscribe Latest Jobs
          </a>
        </nav>

        { auth?.length > 0 ? <a href="" onClick={() => logout()}>Logout</a> : <a href="/login">Log In</a> }
        <form action="search" method="get">
          <input type="text" name="keywords" placeholder="Search jobs" style={{margin: "2px", padding: "8px"}}/>
          <button type="submit" style={{margin: "2px", padding: "8px"}}>Search</button>
        </form>
      </header>
    </>
  );
};

export default Navigation;
