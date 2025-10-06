import { formatDistanceToNow } from "date-fns";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

export default function Notifications() {
  const {
    notifications,
    updateNotification,
    sentRequests,
    getNotifications,
    getSentRequests,
  } = useAuth();
  console.log(sentRequests);

  useEffect(() => {
    getNotifications();
    getSentRequests();
  }, []);
  console.log(sentRequests);
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <div>
          <h1 className="text-3xl font-bold mb-8">Sent Requests</h1>
          <div className="bg-white rounded-2xl shadow-sm divide-y divide-base-200">
            {!sentRequests?.length ||
            sentRequests.every((r) => r?.status !== "pending") ? (
              <div className="p-4 flex items-center  gap-4">
                <div className="flex items-center gap-4 justify-between w-full italic">
                  <p className="text-sm">No pending sent requests</p>
                </div>
              </div>
            ) : (
              sentRequests.map((r) => {
                return (
                  r?.status === "pending" && (
                    <div key={r?._id} className="p-4 flex items-center  gap-4">
                      <div className="flex items-center gap-4 justify-between w-full">
                        <img
                          alt={r?.toUserId?.profile?.name}
                          className="w-12 h-12 rounded-full"
                          src={r?.toUserId?.profile?.avatar}
                        />
                        <div className="w-full flex items-center justify-between gap-4">
                          <div>
                            <p className="font-medium ">
                              {r?.toUserId?.profile?.name}
                            </p>
                            <p className="text-sm">
                              You sent a request to {r?.toUserId?.profile?.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className=" rounded-2xl text-sm italic text-primary">
                              {r?.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                );
              })
            )}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-8">Notifications</h1>
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-bold mb-4 ">New</h2>
              <div className="bg-white rounded-2xl shadow-sm divide-y divide-base-200">
                {!notifications?.new?.length ? (
                  <div className="p-4 flex items-center  gap-4">
                    <div className="flex items-center gap-4 justify-between w-full">
                      <p className="text-sm italic">No new notifications</p>
                    </div>
                  </div>
                ) : (
                  notifications?.new?.map((n) => (
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
                                {n?.fromUserId?.profile?.name} requested to
                                connect with you.
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                className="btn btn-primary rounded-2xl"
                                onClick={() =>
                                  updateNotification(n?._id, "accept")
                                }
                              >
                                Accept
                              </button>
                              <button
                                className="btn btn-basic rounded-2xl"
                                onClick={() =>
                                  updateNotification(n?._id, "reject")
                                }
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        )}

                        {n?.requestType === "request_accept" ? (
                          <div
                            key={n?._id}
                            className="w-full flex items-center justify-between gap-4"
                          >
                            <div>
                              <p className="font-medium ">
                                Contact Request Accepted
                              </p>
                              <p className="text-sm italic">
                                {n?.fromUserId?.profile?.name} accepted your
                                contact request.
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                className="btn btn-primary rounded-2xl"
                                onClick={() =>
                                  updateNotification(n?._id, "read")
                                }
                              >
                                Read
                              </button>
                            </div>
                          </div>
                        ) : n?.requestType === "request_reject" ? (
                          <div
                            key={n?._id}
                            className="w-full flex items-center justify-between gap-4"
                          >
                            <div>
                              <p className="font-medium italic">
                                Contact Request Rejected
                              </p>
                              <p className="text-sm">
                                {n?.fromUserId?.profile?.name} rejected your
                                contact request.
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                className="btn btn-primary rounded-2xl"
                                onClick={() =>
                                  updateNotification(n?._id, "read")
                                }
                              >
                                Read
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-4">History</h2>
              <div className="bg-white rounded-2xl shadow-sm divide-y divide-base-200">
                {!notifications?.history?.length ? (
                  <div className="p-4 flex items-center  gap-4">
                    <div className="flex items-center gap-4 justify-between w-full ">
                      <p className="text-sm italic">No history notifications</p>
                    </div>
                  </div>
                ) : (
                  notifications?.history?.map((n) => (
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
                        {n?.requestType === "contact_request" ? (
                          <div>
                            <p className="font-medium text-stone-800">
                              You have handled {n?.fromUserId?.profile?.name}'s
                              contact request.
                            </p>
                            <p className="text-sm text-stone-600 italic">
                              status: {n?.requestId?.status}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium text-stone-800">
                              {n?.fromUserId?.profile?.name} have handled your
                              contact request.
                            </p>
                            <p className="text-sm text-stone-600 italic">
                              status: {n?.requestId?.status}
                            </p>
                          </div>
                        )}
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
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
