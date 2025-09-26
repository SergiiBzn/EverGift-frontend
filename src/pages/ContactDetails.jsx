// import { useParams } from "react-router";

const ContactDetails = () => {
  // const { contactId } = useParams();

  return (
    <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-xl bg-white shadow-sm p-6">
          <div className="flex items-start gap-6 ">
            <div
              className="h-32 w-32 flex-shrink-0 rounded-full bg-cover bg-center 
            bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9SHjPKJ-Sx0P9Aahf3pXxMvikK1NukTA9oztT1srYNTiMdBgVx62RG2OyQCmi1BoG9Svksq0v2-f5_7pJx7IBtd7tlBGcut0hxknv0slyK5TKS_meSgxcaM7GPVx1K1joKh7g-hRYmuOwwg6XDY0PDSZbQJjdlph6CSiw6qR2lnUnflv769dBDAN76avS8HMSUKxPi0Sdh3Ftnueshu83Q4tEV7u88quR3O2wqLCfyie5Gi82FBTZdHtVzisENopIz6-yjYQKutb3')]"
            ></div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-zinc-900">
                    Sophia Carter
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    32 years old
                  </p>
                </div>
                <button className="btn btn-primary shadow-md">
                  <span className="material-symbols-outlined">
                    auto_awesome
                  </span>
                  <span>AI Gift Suggestions</span>
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary/80">
                  Fashion
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary/80">
                  Hiking
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-neutral">
              Notes
              <textarea
                className=" mt-1 block w-full rounded-lg border-zinc-300 dark:border-zinc-700 text-base-content bg-base-200 dark:bg-background-dark p-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                name="notes"
                placeholder="Add your notes here..."
                rows="4"
              ></textarea>
            </label>
          </div>
        </div>
        <div className="rounded-xl bg-white shadow-sm p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Gift Events</h3>
            <button className="btn btn-primary btn-outline rounded-2xl">
              <span className="material-symbols-outlined"> add </span>
              <span>Add</span>
            </button>
          </div>
          <div
            className="rounded-xl bg-white dark:bg-zinc-900/50 shadow-sm p-6"
            x-data="{ events: [ { id: 1, title: 'Birthday', date: 'June 15, 2024' }, { id: 2, title: 'Christmas', date: 'December 25, 2024' }, { id: 3, title: 'Anniversary', date: 'October 10, 2024' }, { id: 4, title: 'Valentine\'s Day', date: 'February 14, 2025' }, { id: 5, title: 'Mother\'s Day', date: 'May 11, 2025' }, { id: 6, title: 'Graduation', date: 'May 20, 2025' }, { id: 7, title: 'Housewarming', date: 'July 1, 2025' } ], currentPage: 0, itemsPerPage: 5, get totalPages() { return Math.ceil(this.events.length / this.itemsPerPage) }, get pagedEvents() { const start = this.currentPage * this.itemsPerPage; const end = start + this.itemsPerPage; return this.events.slice(start, end); }, nextPage() { if (this.currentPage &lt; this.totalPages - 1) { this.currentPage++; } }, prevPage() { if (this.currentPage &gt; 0) { this.currentPage--; } } }"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Gift Events
              </h3>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-2 rounded-lg border border-primary/50 dark:border-primary/70 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  <span className="material-symbols-outlined"> add </span>
                  <span>Add</span>
                </button>
                <div
                  className="flex items-center gap-2"
                  x-show="totalPages &gt; 1"
                >
                  <button className="rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </button>
                  <button className="rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              <template x-for="event in pagedEvents">
                <div className="group relative cursor-pointer rounded-lg border border-zinc-200 dark:border-zinc-800 bg-background-light dark:bg-background-dark p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h4
                    className="text-md font-semibold text-zinc-900 dark:text-white"
                    x-text="event.title"
                  ></h4>
                  <p
                    className="text-sm text-zinc-500 dark:text-zinc-400"
                    x-text="event.date"
                  ></p>
                  <button className="absolute top-3 right-3 rounded-full p-1.5 text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700/50">
                    <span className="material-symbols-outlined text-base">
                      push_pin
                    </span>
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-white dark:bg-zinc-900/50 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Sent Gift History
              </h3>
              <button className="inline-flex items-center gap-2 rounded-lg border border-primary/50 dark:border-primary/70 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <span className="material-symbols-outlined"> add </span>
                <span>Add</span>
              </button>
            </div>
            <div className="mt-4 flow-root">
              <div className="-mx-6 -my-2 overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6">
                  <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                    <thead>
                      <tr>
                        <th
                          className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-zinc-900 dark:text-white"
                          scope="col"
                        >
                          Gift
                        </th>
                        <th
                          className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 dark:text-white"
                          scope="col"
                        >
                          Date
                        </th>
                        <th
                          className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 dark:text-white"
                          scope="col"
                        >
                          Reason for a gift
                        </th>
                        <th className="relative py-3.5 pl-3 pr-6" scope="col">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-zinc-900 dark:text-white">
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
                            <a
                              className="text-red-500 hover:text-red-400"
                              href="#"
                            >
                              <span className="material-symbols-outlined">
                                delete
                              </span>
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-zinc-900 dark:text-white">
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
                            <a
                              className="text-red-500 hover:text-red-400"
                              href="#"
                            >
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
          <div className="rounded-xl bg-white dark:bg-zinc-900/50 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Wishlist
              </h3>
              <button className="inline-flex items-center gap-2 rounded-lg border border-primary/50 dark:border-primary/70 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
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
                  <p className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white">
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
                  <p className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white">
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
      </div>
    </main>
  );
};
export default ContactDetails;
