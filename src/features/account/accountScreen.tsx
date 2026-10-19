
import ProfileCard from "./Components/ProfileCard";
import ChangePasswordCard from "./Components/ChangePasswordCard";

export default function AccountScreen() {
  return (
    <main>
    

      <div className="container mx-auto grid gap-6 px-4 py-10 lg:grid-cols-[260px_1fr]">
     

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