import * as React from "react";
import * as userStore from "./store";
import { Link } from "react-router-dom";
import avatars from "./data/avatars";

function getCurrentUser() {
  return userStore.get().user;
}

const ProfileExtension: React.FC = () => {
  const [user, setUser] = React.useState(getCurrentUser);

  React.useEffect(() => {
    const handler = () => setUser(getCurrentUser);
    window.addEventListener("updated-user", handler);
    return () => {
      window.removeEventListener("updated-user", handler);
    };
  }, []);

  if (user) {
    const avatar = user.avatarId ? avatars[user.avatarId] : avatars[0];
    const profilepic = user.imageUrl ? (
      <img title={`${user.avatarId}`} src={user.imageUrl} />
    ) : (
      avatar
    );

    return (
      <Link to="/profile">
        <div className="user-profile">
          <div className="user">
            <div className="name">{user.name}</div>
            <div className="image">{profilepic}</div>
          </div>
        </div>
      </Link>
    );
  }

  return <Link to="/profile">Log In</Link>;
};

export default ProfileExtension;
