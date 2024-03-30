import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Login from './pages/Login/Login';
import { setMyProfile } from './helpers/utility';
import { addRequestInterceptor, addResponseInterceptor, serviceApi } from './services/api/api.helper';

function App() {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  console.log('currentPath--', currentPath);

  useEffect(() => {
    const reqInterceptor = addRequestInterceptor(serviceApi);
    const resInterceptor = addResponseInterceptor(serviceApi, navigate);

    if (!loaded) {
      setLoaded(true);
      console.log('called App.useEffect');
      setMyProfile().then(res => {
        if (res.success && currentPath.startsWith('/login')) {
          navigate('/');
        }
      });
    }
    return () => {
      serviceApi.interceptors.request.eject(reqInterceptor);
      serviceApi.interceptors.response.eject(resInterceptor);
    };
  }, [currentPath, loaded, navigate]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
