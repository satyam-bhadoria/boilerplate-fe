import { serviceApi } from "./api.helper";


const UserApi = {
  getMyProfile: () => {
    return serviceApi.get('/v1/users/me');
  },
  resetPassword: (oldPassword, newPassword) => {
    return serviceApi.post('/v1/users/me/resetPassword', {
      currentPassword: oldPassword,
      newPassword,
    });
  }
}

export default UserApi;
