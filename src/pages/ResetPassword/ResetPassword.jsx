import { useState } from 'react';
import { toast } from 'react-toastify';
import './ResetPassword.css';
import UserApi from '../../services/api/users';

function ResetPassword() {
  const [oldPassword, setOldPassword] = useState('12345678');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'old_password') {
      setOldPassword(value);
    } else if (name === 'password') {
      setNewPassword(value)
    } else {
      setConfirmPassword(value);
    }
  };

  const handleResetPasswordFormSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.info('confirm password should match');
    } else {
      UserApi.resetPassword(oldPassword, newPassword)
      .then((res) => {
        setOldPassword('');
        setNewPassword('')
        setConfirmPassword('');
        if (res.status === 'success'){
          toast.success('Password changed successfully');
        } else {
          toast.error(res.error);
        }
      })
      .catch((e) => {console.log(e)})
    }
  };

  return (
    <div className="reset-password-form-container text-center">
      <div className="reset-password-signin">
        <form onSubmit={handleResetPasswordFormSubmit}>
          <h1 className="h3 mb-3 fw-normal">Reset your password</h1>
      
          <div className="form-floating">
            <input type="password" name="old_password" className="form-control" id="floatingPassword1" value={oldPassword} onChange={handleInputChange} required placeholder="*******" />
            <label htmlFor="floatingPassword1">Current Password</label>
          </div>
          <div className="form-floating">
            <input type="password" name="password" className="form-control" id="floatingPassword" value={newPassword} onChange={handleInputChange} required placeholder="*******" />
            <label htmlFor="floatingPassword">New Password</label>
          </div>
          <div className="form-floating">
            <input type="password" name="confirm_password" className="form-control" id="floatingPassword3" value={confirmPassword} onChange={handleInputChange} required placeholder="*******" />
            <label htmlFor="floatingPassword3">Confirm New Password</label>
          </div>
          <button className="mt-3 w-100 btn btn-lg btn-primary" type="submit">Reset password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
