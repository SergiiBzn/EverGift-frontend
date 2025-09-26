import React from "react";

const ContactData = () => {
  return (
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
              <p className="text-zinc-500 dark:text-zinc-400">32 years old</p>
            </div>
            <button className="btn btn-primary shadow-md">
              <span className="material-symbols-outlined">auto_awesome</span>
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
  );
};

export default ContactData;
