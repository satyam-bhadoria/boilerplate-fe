import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import AuthApi from '../../services/api/auth';
import { toast } from 'react-toastify';
import { setMyProfile } from '../../helpers/utility';

function Login() {
  const [email, setEmail] = useState('admin@email.com');
  const [password, setPassword] = useState('12345678');

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value)
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    AuthApi.login(email, password)
      .then(async (res) => {
        if (res.status === 'success') {
          const result = await setMyProfile();
          if (result.success) {
            navigate('/');
          }
        } else {
          toast.error(res.message);
        }
      })
      .catch(e => {
        console.log('api error', e);
      })
  };

  return (
    <div className="login-form-container">
      <div className="form-signin">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input type="email" name="email" className="form-control" id="floatingInput" value={email} onChange={handleInputChange} placeholder="name@example.com" />
              <label htmlFor="floatingInput">Email</label>
          </div>
          <div className="form-floating">
            <input type="password" name="password" className="form-control" id="floatingPassword" value={password} onChange={handleInputChange} placeholder="*******" />
              <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="mt-3 w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
