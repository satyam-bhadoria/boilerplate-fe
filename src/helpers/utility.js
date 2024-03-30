import { toast } from "react-toastify";
import UserApi from "../services/api/users";

export const setMyProfile = async () => {
  return UserApi.getMyProfile()
  .then((res) => {
    if (res.status === 'success'){
      window.Dentacamp.CurrentUser = res.result;
    } else {
      toast.error(res.message);
    }
    return {
      success: res.status === 'success',
    }
  })
  .catch((err) => {
    return {
      success: false,
      message: err.message,
    }
  });
}