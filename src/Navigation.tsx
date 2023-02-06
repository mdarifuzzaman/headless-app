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
          <a href="/register">Companies</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>         
          <a
            data-mooform-id="ebb65c8c-5c8e-41fd-a8e7-f56dd75f7cd5"
            href="https://mdar.m-pages.com/U3LbsB/subscribe-to-get-job-notification"
          >
            Subscribe Us
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
