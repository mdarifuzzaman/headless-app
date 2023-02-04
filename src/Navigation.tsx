import { useRouter } from "next/router";
import { deleteCookie } from 'cookies-next';
import Router from 'next/router';

const Navigation = (): JSX.Element => {
  const {asPath} = useRouter();
  const logout = () => {
    deleteCookie("authCookie");
    Router.push('/login');
  }
  return (
    <>
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/job-listing">Jobs</a>
          <a href="/companies">Companies</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>         
          <a
            data-mooform-id="ebb65c8c-5c8e-41fd-a8e7-f56dd75f7cd5"
            href="https://mdar.m-pages.com/U3LbsB/subscribe-to-get-job-notification"
          >
            Subscribe Us
          </a>
        </nav>

        {!asPath.startsWith("/login") ? <a href="" onClick={() => logout()}>Logout</a> : null }
        <form action="search" method="get">
          <input type="text" name="keywords" placeholder="Search for jobs" />
          <button type="submit">Search</button>
        </form>
      </header>
    </>
  );
};

export default Navigation;
