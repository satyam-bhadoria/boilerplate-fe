import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthApi from "../../services/api/auth";
import RoundedBox from "../Box/RoundedBox";
import { toast } from 'react-toastify';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  let tabName = '';
  if (currentPath.startsWith('/about')) {
    tabName = 'about';
  } else if (currentPath === '/') {
    tabName = 'home';
  }

  const username = window.Dentacamp?.CurrentUser?.firstName;

  const signout = () => {
    AuthApi.signout().then((res) => {
      if (res.status === 'success') {
        navigate('/login');
      } else {
        toast.error(res.message);
      }
    }).catch((e) => {});
  }

  return (
    <RoundedBox className="d-flex flex-column flex-shrink-0 bg-body-tertiary w-25 overflow-y-auto">
      <Link to="/" className='d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none'>
        <span className="fs-4">Dentacamp</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link className={`nav-link ${tabName === 'home' ? 'active': 'link-body-emphasis'}`} to="/">Home</Link>
        </li>
        <li>
          <Link className={`nav-link ${tabName === 'about' ? 'active': 'link-body-emphasis'}`} to="/about">About</Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <button className="nav-link d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>{username}</strong>
        </button>
        <ul className="dropdown-menu text-small shadow">
          <li><Link className='dropdown-item' to="/reset-password">Reset password</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><button className="dropdown-item" onClick={signout}><i className="bi bi-box-arrow-right"></i> Sign out</button></li>
        </ul>
      </div>
    </RoundedBox>
  );
}

export default Navbar;
