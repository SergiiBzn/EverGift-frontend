import { useEffect } from "react";
import useNotifications from "../hooks/useNotifications";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";

export default function Notifications() {
  const { baseUrl, improveErrorMessage } = useAuth();

  const { notifications, getNotifications } = useNotifications();

  useEffect(() => {
    getNotifications();
  }, []);
  // console.log("notifications:", notifications);

  const updateNotification = async (notificationId, action) => {
    try {
      const response = await fetch(
        `${baseUrl}/notifications/${notificationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: action,
          }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const { error } = await response.json();
        await improveErrorMessage(error);
        return;
      }
      getNotifications();
      toast.success(
        `Notification ${
          action === "delete" ? "deleted" : action + "ed"
        } successfully`
      );
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Notifications</h1>
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-bold mb-4 ">New</h2>
            <div className="bg-white rounded-2xl shadow-sm divide-y divide-base-200">
              {notifications?.new?.map((n) => (
                <div key={n?._id} className="p-4 flex items-center  gap-4">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <img
                      alt={n?.fromUserId?.profile?.name}
                      className="w-12 h-12 rounded-full"
                      src={n?.fromUserId?.profile?.avatar}
                    />
                    {n?.requestType === "contact_request" && (
                      <div
                        key={n?._id}
                        className="w-full flex items-center justify-between gap-4"
                      >
                        <div>
                          <p className="font-medium ">Contact Request</p>
                          <p className="text-sm">
                            {n?.fromUserId?.profile?.name} requested to connect
                            with you.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className="btn btn-primary rounded-2xl"
                            onClick={() => updateNotification(n?._id, "accept")}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-basic rounded-2xl"
                            onClick={() => updateNotification(n?._id, "reject")}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    )}

                    {n?.requestType === "request_accept" && (
                      <div
                        key={n?._id}
                        className="w-full flex items-center justify-between gap-4"
                      >
                        <div>
                          <p className="font-medium ">
                            Contact Request Accepted
                          </p>
                          <p className="text-sm">
                            {n?.fromUserId?.profile?.name} accepted your contact
                            request.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className="btn btn-primary rounded-2xl"
                            onClick={() => updateNotification(n?._id, "read")}
                          >
                            Read
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">History</h2>
            <div className="bg-white rounded-2xl shadow-sm divide-y divide-base-200">
              {notifications?.history?.map((n) => (
                <div
                  key={n?._id}
                  className="p-4 flex items-center justify-between gap-4 opacity-60"
                >
                  <div className="flex items-center gap-4 w-full">
                    <img
                      alt={n?.fromUserId?.profile?.name}
                      className="w-12 h-12 rounded-full"
                      src={n?.fromUserId?.profile?.avatar}
                    />
                    <div>
                      <p className="font-medium text-stone-800">
                        You accepted {n?.fromUserId?.profile?.name}'s contact
                        request.
                      </p>
                      <p className="text-sm text-stone-600">
                        {n?.requestId?.status}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-stone-500">
                    {/* Format the updatedAt date */}
                    {formatDistanceToNow(new Date(n?.updatedAt), {
                      addSuffix: true,
                    })}
                  </p>
                  <button
                    className="btn btn-outline btn-primary rounded-2xl"
                    onClick={() => updateNotification(n?._id, "delete")}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
