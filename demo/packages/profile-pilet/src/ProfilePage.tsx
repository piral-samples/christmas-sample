import * as React from "react";
import * as userStore from "./store";
import { AccountSwitcher } from "./AccountSwitcher";
import { LogoutButton } from "./LogoutButton";

const ProfilePage: React.FC = () => {
  const { user } = userStore.get();

  return (
    <div className="profile-page">
      <AccountSwitcher />
      {user && <LogoutButton />}
    </div>
  );
};

export default ProfilePage;
