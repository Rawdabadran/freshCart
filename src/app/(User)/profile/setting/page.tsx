
import ProfileCard from "../../../../features/account/Components/ProfileCard";
import ChangePasswordCard from "../../../../features/account/Components/ChangePasswordCard";

export default function AccountSetting() {
  return (
    <main>
    

      <div className="container mx-auto ">
       

        <div className="space-y-6">
          <header>
            <h2 className="text-lg font-bold text-gray-900">Account Settings</h2>
            <p className="text-xs text-gray-500">
              Update your profile information and change your password
            </p>
          </header>

          <ProfileCard />
          <ChangePasswordCard />
        </div>
      </div>
    </main>
  );
}