const ReminderComponent = () => {
  return (
    <div className="bg-base-200 p-4 rounded-xl flex flex-col gap-6 shadow-md">
      <div>
        <h3 className="text-lg font-bold mb-4">Pinned</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-background-light dark:bg-background-dark shadow-sm">
            <div className="flex-1">
              <p className="font-bold">Mother's Day</p>
              <p className="text-sm text-muted-light dark:text-muted-dark">
                May 12
              </p>
            </div>
            <div className="w-12 h-12 bg-center bg-no-repeat bg-cover rounded-full bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCvPSQKPGXCnWbLY35gfN4kooPIpbnyxt-oaqWBmhjmLdxdvXhGqJbKlB8PxPcnbcNWEUdFBf8y8n5u2kWlMRgO56AOe95_eJ2AFig4rG2TmLZDdZtEJzL8Py9h1fu9HA0SP7SJLL7gX5v-7rsyCqzyE6ocNnQBFNXrqcR0TDTnZoKeFi9wXy7N27TJ29XpdTjB6YFnulgCba2kXXU2CejP7fD-5o_7p8exurdt8obuep_pKXhoDca0Etzb52CaMlFoqCqO4pmTTYPh')]"></div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-4">Coming in next 2 months</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-background-light dark:bg-background-dark shadow-sm">
            <div className="flex-1">
              <p className="font-bold">Ethan's Birthday</p>
              <p className="text-sm text-muted-light dark:text-muted-dark">
                May 15
              </p>
            </div>
            <div className="w-12 h-12 bg-center bg-no-repeat bg-cover rounded-full bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCvPSQKPGXCnWbLY35gfN4kooPIpbnyxt-oaqWBmhjmLdxdvXhGqJbKlB8PxPcnbcNWEUdFBf8y8n5u2kWlMRgO56AOe95_eJ2AFig4rG2TmLZDdZtEJzL8Py9h1fu9HA0SP7SJLL7gX5v-7rsyCqzyE6ocNnQBFNXrqcR0TDTnZoKeFi9wXy7N27TJ29XpdTjB6YFnulgCba2kXXU2CejP7fD-5o_7p8exurdt8obuep_pKXhoDca0Etzb52CaMlFoqCqO4pmTTYPh')]"></div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-background-light dark:bg-background-dark shadow-sm">
            <div className="flex-1">
              <p className="font-bold">Olivia's Birthday</p>
              <p className="text-sm text-muted-light dark:text-muted-dark">
                June 20
              </p>
            </div>
            <div className="w-12 h-12 bg-center bg-no-repeat bg-cover rounded-full"></div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-background-light dark:bg-background-dark shadow-sm">
            <div className="flex-1">
              <p className="font-bold">Sophia's Birthday</p>
              <p className="text-sm text-muted-light dark:text-muted-dark">
                July 5
              </p>
            </div>
            <div className="w-12 h-12 bg-center bg-no-repeat bg-cover rounded-full bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCvPSQKPGXCnWbLY35gfN4kooPIpbnyxt-oaqWBmhjmLdxdvXhGqJbKlB8PxPcnbcNWEUdFBf8y8n5u2kWlMRgO56AOe95_eJ2AFig4rG2TmLZDdZtEJzL8Py9h1fu9HA0SP7SJLL7gX5v-7rsyCqzyE6ocNnQBFNXrqcR0TDTnZoKeFi9wXy7N27TJ29XpdTjB6YFnulgCba2kXXU2CejP7fD-5o_7p8exurdt8obuep_pKXhoDca0Etzb52CaMlFoqCqO4pmTTYPh')]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderComponent;
