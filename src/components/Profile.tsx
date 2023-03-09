import { FunctionComponent, useEffect } from "react";
import { getUserProfile } from "../services/usersService";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  useEffect(() => {
    getUserProfile()
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, []);
  return <>profile</>;
};

export default Profile;
