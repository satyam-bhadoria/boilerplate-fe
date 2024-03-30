import { serviceApi } from "./api.helper";

const AuthApi = {
  login: (email, password) => {
    return serviceApi.post('/v1/auth/login', {
      email,
      password,
    });
  },
  signout: () => {
    return serviceApi.post('/v1/auth/signout');
  },
}

export default AuthApi;
