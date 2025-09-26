import { useState } from "react";
import { GivenGiftModal } from "../Modals";
const ContactRest = () => {
  const [openAddGivenGift, setOpenAddGivenGift] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="rounded-xl bg-white  shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-zinc-900 ">
            Sent Gift History
          </h3>
          <button
            onClick={() => setOpenAddGivenGift(true)}
            className="btn btn-primary btn-outline rounded-2xl"
          >
            <span className="material-symbols-outlined"> add </span>
            <span>Add</span>
          </button>
          <GivenGiftModal
            isOpen={openAddGivenGift}
            onClose={() => setOpenAddGivenGift(false)}
            onSave={(data) => {
              console.log("Given gift saved:", data);
              setOpenAddGivenGift(false);
            }}
          />
        </div>
        <div className="mt-4 flow-root">
          <div className="-mx-6 -my-2 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6">
              <table className="min-w-full divide-y divide-zinc-800">
                <thead>
                  <tr>
                    <th
                      className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-zinc-900 "
                      scope="col"
                    >
                      Gift
                    </th>
                    <th
                      className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900"
                      scope="col"
                    >
                      Date
                    </th>
                    <th
                      className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 "
                      scope="col"
                    >
                      Reason for a gift
                    </th>
                    <th className="relative py-3.5 pl-3 pr-6" scope="col">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-zinc-900 ">
                      Silk Scarf
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                      Dec 25, 2023
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                      Christmas
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-x-4">
                        <a
                          className="text-primary hover:text-primary/80"
                          href="#"
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </a>
                        <a className="text-red-500 hover:text-red-400" href="#">
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-zinc-900 ">
                      Travel Book
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                      Jun 15, 2023
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                      Birthday
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-x-4">
                        <a
                          className="text-primary hover:text-primary/80"
                          href="#"
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </a>
                        <a className="text-red-500 hover:text-red-400" href="#">
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-white shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-zinc-900 ">Wishlist</h3>
          <button className="btn btn-primary btn-outline rounded-2xl">
            <span className="material-symbols-outlined"> add </span>
            <span>Add</span>
          </button>
        </div>
        <ul
          className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800"
          role="list"
        >
          <li className="flex items-center justify-between gap-x-6 py-3">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-zinc-900 ">
                Designer Handbag
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                A stylish handbag from a top designer.
              </p>
            </div>
            <div className="flex items-center gap-x-4">
              <a className="text-primary hover:text-primary/80" href="#">
                <span className="material-symbols-outlined">edit</span>
              </a>
              <a className="text-red-500 hover:text-red-400" href="#">
                <span className="material-symbols-outlined">delete</span>
              </a>
            </div>
          </li>
          <li className="flex items-center justify-between gap-x-6 py-3">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-zinc-900 ">
                Travel Photography Workshop
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                A workshop focused on travel photography.
              </p>
            </div>
            <div className="flex items-center gap-x-4">
              <a className="text-primary hover:text-primary/80" href="#">
                <span className="material-symbols-outlined">edit</span>
              </a>
              <a className="text-red-500 hover:text-red-400" href="#">
                <span className="material-symbols-outlined">delete</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactRest;
