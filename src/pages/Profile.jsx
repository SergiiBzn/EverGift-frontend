/** @format */
import useAuth from "../hooks/useAuth.jsx";

import ProfileSection from "../components/profile-page/ProfileSection.jsx";
import ContactSection from "../components/profile-page/ContactSection.jsx";
import WishlistSection from "../components/profile-page/WishlistSection.jsx";
import ReceivedGiftSection from "../components/profile-page/ReceivedGiftSection.jsx";

export default function Profile() {
  const { user, allUsers } = useAuth();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-12">
        {/* profile */}
        <ProfileSection profile={user.profile} />

        {/* contacts */}

        <ContactSection />

        {/* whishlist */}

        <WishlistSection initialWishList={user?.wishList || []} />

        {/* Received gift */}
        <ReceivedGiftSection />
      </div>
    </div>
  );
}
