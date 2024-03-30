import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Layout() {
  return (
    <div className='d-flex flex-nowrap vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
