/** @format */

export default function Notifications() {
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Notifications</h1>
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-bold mb-4 ">New</h2>
            <div className="bg-white rounded-2xl shadow-sm divide-y divide-base-200">
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    alt="Sophia's avatar"
                    className="w-12 h-12 rounded-full"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjl1iNrPXLXC-wQJAocssBNWoqkF15aawF8QmBqF3vlBj8cyW4zje-wrNmkUbuAOc4ic4mhpSlhhy_MbUXbkK7P_HO5lf2U5nK6ibYcTJB9YGeBavwnMOzqH1Xhy7jbqC2OvZECb0JddMyb8h2DaOMfxNT9_UGT9tLGu7BslXDN_SLYPdb4XJ4kXyAGNt3ydPhl4WLip7DQm-GCoEthpzWgOiiv3ShuKttmLz2v_4hXUbhRQJ6ZpvH6cDnM3X8Ic7xffz_cjR5cj8E"
                  />
                  <div>
                    <p className="font-medium ">Contact Request</p>
                    <p className="text-sm">
                      Sophia requested to connect with you.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-primary rounded-2xl">
                    Accept
                  </button>
                  <button className="btn btn-basic rounded-2xl">Decline</button>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    alt="Another user's avatar"
                    className="w-12 h-12 rounded-full"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFG-Oc1JADBXzrGz3L0hslUjLa2zUfA3yXjX2e4NLwFWdsy-qzKb4wPR-unBFAmh1X-Lz-rgpkzZFhS1VzfUf8SmcgnZPn9ACE-36P02YKnSnEQSxtbvU85hF9T5K3h_VGQ2Ek8Aai4mgNyeqTHLMcjd189XgYL3a4frirKbtFc_6sJK4OmlD6Trd6NOTw7AFoTJTYEy_DfLItN7Dnwh9f07AVEq23L2DzVQiRVmN0vpyVDfJo9NrloZo8tGZzodXoJ0JdX7gSwZ5e"
                  />
                  <div>
                    <p className="font-medium">Contact Request</p>
                    <p className="text-sm">
                      Daniel requested to connect with you.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-primary rounded-2xl">
                    Accept
                  </button>
                  <button className="btn btn-basic rounded-2xl">Decline</button>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 dark:bg-primary/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">
                      cake
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">Gift Event Reminder</p>
                    <p className="text-sm">
                      Emily's birthday is coming up soon.
                    </p>
                  </div>
                </div>
                <button className="btn btn-basic rounded-2xl">View</button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">History</h2>
            <div className="bg-white rounded-2xl shadow-sm divide-y divide-base-200">
              <div className="p-4 flex items-center justify-between gap-4 opacity-60">
                <div className="flex items-center gap-4">
                  <img
                    alt="Liam's avatar"
                    className="w-12 h-12 rounded-full"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkAdQrEQpsHbXXQl6_DldVSnlD7tY0L3bvyVy09LnwY9NcLFkDpJz0lOWNxKVtCyGY1RJVQtFmsk3i2q-dZqxrbNYWxfmCzZ9hhFPjaPlWf-bgvEjLmVMIAJ6pkw7qeMpm-RbEwQKdAV_672Idqol3WIoNxE0YW_Omr8_LupTXO5Fc2QacOU7JYWa-dPb-7xfWmcw14t1uMNCxcajY6eu7vOCAUACeyGO6UM0Oi9CSTlJbwL_Ut3U4cQEvlPCouYE-OjrPJhDT_54X"
                  />
                  <div>
                    <p className="font-medium text-stone-800">
                      You accepted Liam's contact request.
                    </p>
                    <p className="text-sm text-stone-600">Accepted</p>
                  </div>
                </div>
                <p className="text-sm text-stone-500">2d ago</p>
              </div>
              <div className="p-4 flex items-center justify-between gap-4 opacity-60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 dark:bg-primary/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">
                      celebration
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-stone-800 ">
                      Anniversary Reminder
                    </p>
                    <p className="text-sm text-stone-600">
                      You viewed the reminder for Emily &amp; David's
                      anniversary.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  5d ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
