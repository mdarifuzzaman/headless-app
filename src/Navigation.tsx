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
      <div>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
            <a href="/job-listing">Jobs</a>
            </li>
            <li>
              <a href="/companies">Companies</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>   
            </li>
            <li>
                <a
                data-mooform-id="ebb65c8c-5c8e-41fd-a8e7-f56dd75f7cd5"
                href="https://mdar.m-pages.com/U3LbsB/subscribe-to-get-job-notification"
              >
                Subscribe Us
              </a>
            </li>
            <li>
              {!asPath.startsWith("/login") ? <a href="" onClick={() => logout()}>Logout</a> : null }
            </li>
          </ul>
        </nav>        
      </div>
  );
};

export default Navigation;
